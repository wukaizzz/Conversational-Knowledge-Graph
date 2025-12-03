
<template>
  <div  id="thread-bottom-container" class="group/thread-bottom-container bg-token-main-surface-primary relative isolate z-10 w-full basis-auto md:border-transparent md:pt-0 dark:border-white/20 md:dark:border-transparent content-fade flex flex-col">
    <div id="thread-bottom" class="px-[24px]">
      <div class="text-base mx-auto max-w-[40rem] xl:max-w-[48rem] px-(--thread-content-margin)">
        <div class="[--thread-content-max-width:40rem] thread-lg:[--thread-content-max-width:48rem] mx-auto max-w-(--thread-content-max-width) flex-1">
          <div class="flex justify-center empty:hidden"></div>
          <!-- 全屏 vs 固定底栏 -->
           <!-- 把变量写成：
:root {
  --composer-container-height: 180px;   /* 任意固定高度 */
  --composer-container-flex: 0 0 auto;  /* 不放大、不缩小 */
}
h-[var(--composer-container-height,100%)] 会立刻变成 180px 高，
同时 flex-[0 0 auto] 让它 不再吃剩余空间，而是 固定尺寸。 -->
          <div class="pointer-events-auto relative z-1 flex h-[var(--composer-container-height,100%)] max-w-full flex-[var(--composer-container-flex,1)]">
            <div class="absolute start-0 end-0 bottom-full z-20"></div>
            <form action="" class="group/composer w-full" ref="composerRef"> 
              <!-- 「三栏自适应 + 一键重排」——
只要 JS 给祖先加一句 npm ，Grid 区域瞬间换布局，不用改 DOM 顺序，一条类名搞定。 -->
              <div class="composer-shell bg-token-bg-primary cursor-text overflow-clip bg-clip-padding p-2.5 contain-inline-size dark:bg-[#303030] grid items-end grid-cols-[auto_1fr_auto] [grid-template-areas:'header_header_header'_'leading_primary_trailing'_'._footer_.'] group-data-expanded/composer:[grid-template-areas:'header_header_header'_'primary_primary_primary'_'leading_footer_trailing'] shadow-short" style="border-radius: 28px; transform: none; transform-origin: 50% 50% 0px;">
                <!-- 没 data-expanded → 负 margin 继续存在，视觉上顶底穿透，更紧凑
有 data-expanded → 负 margin 被 mb-0 覆盖 → 贴底无空隙，更宽松 -->
                <div class="primary-slot -my-2.5 -mb-[8px] flex min-h-0 items-stretch overflow-x-hidden px-1.5 [grid-area:primary] group-data-expanded/composer:mb-0 group-data-expanded/composer:px-2.5" style="transform: none; transform-origin: 50% 50% 0px;">
                  <div class="_prosemirror-parent_1dsxi_2 text-token-text-primary max-h[max(30svh,5rem)] max-h-52 flex-1 overflow-auto default-browser vertical-scroll-fade-mask">
                    <!-- <textarea class="_fallbackTextarea_1dsxi_2"  name="prompt-textarea" autofocus placeholder="输入一个关键词" data-virtualkeyboard="true" style="display: none;">
                    </textarea>
                    <div contenteditable="true" translate="no" class="ProseMirror" ref="editorEL" data-virtualkeyboard="true">
                    </div> -->
                    <textarea
                      class="fallback-textarea"
                      name="prompt-textarea"
                      placeholder="输入一个消息..."
                      autofocus
                      style="display: none;"
                    />
                    <!-- 核心编辑器容器 -->
                    <div
                      ref="innerRef"
                      class="pm-inner"
                      :class="{ 'is-scrolling': isScrolling }"
                      @click="focusEditor"
                    >
                      <div
                        contenteditable="true"
                        translate="no"
                        class="ProseMirror"
                        ref="editorEL"
                        data-virtualkeyboard="true"
                      >
                      <!-- ProseMirror 会在这里生成内容 -->
                      </div>
                    </div>
                    <div class="scroll-fade-mask" />
                  </div>
                </div>
                <div class="[grid-area:leading] composer-leading" style="transform: none; transform-origin: 50% 50% 0px;">
                  <span class="flex" data-state="closed">
                    <button type="button" class="composer-btn leading-action" id="composer-plus-btn" data-state="closed">
                      <!-- 模型选择 svg -->
                      <ToggleLLM></ToggleLLM>
                    </button>
                  </span>
                </div>
                <div class="flex items-center gap-2 [grid-area:trailing] composer-trailing" style="transform: none; transform-origin: 50% 50% 0px;">
                  <div class="ms-auto flex items-center gap-1.5">
                    <button @click="handleSend" :disabled="props.disabled" data-testid="send-button" class="composer-submit-btn composer-submit-button-color h-9 w-9 rounded-3xl flex items-center justify-center">
                      <!-- send svg -->
                      <SendBtn></SendBtn>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="text-token-text-secondary flex-shrink-0 min-h-10 w-full flex items-center justify-center px-4 py-2 text-center text-xs [view-transition-name:var(--vt-disclaimer)] md:px-[60px]">
        <div class="pointer-events-auto text-[#f3f3f3] w-full">你想要了解什么知识点</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="ChatInput">

import { onMounted,ref } from 'vue';
// prosemirror
import { EditorState, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema } from 'prosemirror-schema-basic';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { placeholder } from 'prosemirror-placeholder';
import { history, undo, redo } from 'prosemirror-history'
import 'prosemirror-view/style/prosemirror.css'; 
// svg
import ToggleLLM from './icons/ToggleLLM.vue';
import SendBtn from './icons/SendBtn.vue';

const props = defineProps<{
  disabled?:boolean;
}>()
const emit = defineEmits<{
  (e:'send',data:string):void;
}>()


const innerRef = ref<HTMLElement>()
const editorEL = ref<HTMLElement>()
const composerRef = ref<HTMLElement>()
const isScrolling = ref(false)
let view:EditorView | null = null;

const MAX_LINES = 14
const LINE_HEIGHT = 28
const MIN_CONTENT_HEIGHT = 32
const EXPAND_THRESHOLD = 2
let verticalPadding = 0

const measurePadding = () => {
  if (!innerRef.value) return
  const styles = window.getComputedStyle(innerRef.value)
  verticalPadding = parseFloat(styles.paddingTop || '0') + parseFloat(styles.paddingBottom || '0')
}

const updateHeight = () => {
  if (!innerRef.value) return
  if (!verticalPadding) measurePadding()

  const el = innerRef.value
  el.style.height = 'auto'
  const needed = el.scrollHeight
  const padding = verticalPadding
  const contentHeight = Math.max(needed - padding, 0)
  const maxContentHeight = LINE_HEIGHT * MAX_LINES
  const clampedContent = Math.min(Math.max(contentHeight, MIN_CONTENT_HEIGHT), maxContentHeight)

  el.style.height = `${clampedContent + padding}px`
  el.style.overflowY = contentHeight > maxContentHeight ? 'auto' : 'hidden'

  const effectiveContent = Math.max(contentHeight, LINE_HEIGHT)
  const lines = Math.ceil(effectiveContent / LINE_HEIGHT)
  if (composerRef.value) {
    if (lines > EXPAND_THRESHOLD) {
      composerRef.value.setAttribute('data-expanded', '')
    } else {
      composerRef.value.removeAttribute('data-expanded')
    }
  }

  // 控制渐隐遮罩显示
  isScrolling.value = contentHeight > maxContentHeight
}

const focusEditor = () => {
  view?.focus()
}

const handleSend = () => {
  if(!view){
    console.warn('编辑器未初始化');
    return;
  }
  const { state,state:{ schema } } = view;
  const text = state.doc.textContent.trim();
  if(!text || props.disabled){
    console.log('文本为空或者不支持发送');
    return;
  }
  emit('send',text);
  const emptyParagraph = schema.nodes.paragraph?.createAndFill();
  if(!emptyParagraph){
    console.log('无法创建空段落');
    return;
  }
  const tr = state.tr.replaceWith(0,state.doc.content.size,emptyParagraph);
  tr.setSelection(TextSelection.atStart(tr.doc));
  view.dispatch(tr);
  view.focus();
}
onMounted(() => {
  const customKeymap = {
    'Mod-z':undo,
    'Mod-shift-z':redo,
  };
  const mountEL = editorEL.value!;
  view = new EditorView(mountEL, {
    state: EditorState.create({
      schema,
      doc: schema.nodes.doc.createAndFill() ?? undefined,
      plugins: [
        history(),
        placeholder('键入一个关键词'),
        keymap(baseKeymap),
        keymap(customKeymap)
      ]
    }),
    dispatchTransaction(tr) {
      if(view){
        const newState = view.state.apply(tr)
        view.updateState(newState)
      }
      updateHeight();
    }
  })
  requestAnimationFrame(updateHeight)
})

</script>

<style scoped lang="css">
.single-line {
  overflow: hidden;
  white-space: nowrap;
   /* 不用 ... 用渐变 */
  text-overflow: clip;  
}

.content-fade {
  position: relative;
}
.content-fade::after {
  content: '';
  position: absolute;
  top: 0; right: 0; bottom: 0;
  width: 2rem;                    /* 渐变遮罩宽度 */
  background: linear-gradient(to right, transparent, var(--surface-bg));
}

/* 文本域 */
._fallbackTextarea_1dsxi_2 {
    height: 1lh;
}
._fallbackTextarea_1dsxi_2 {
    --tw-ring-shadow: var(--tw-ring-inset,)0 0 0 calc(var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);
    background-color: #0000;
    border-style: var(--tw-border-style);
    border-width: 0;
    box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);
    box-sizing: content-box;
    color: var(--text-primary);
    display: block;
    height: calc(var(--spacing,.25rem)*10);
    resize: none;
    width: 100%;
}
._fallbackTextarea_1dsxi_2, ._prosemirror-parent_1dsxi_2 .ProseMirror {
    padding-inline: calc(var(--spacing,.25rem)*0);
}
._fallbackTextarea_1dsxi_2, ._prosemirror-parent_1dsxi_2 .ProseMirror {
    word-wrap: break-word;
    font-feature-settings: "liga" 0;
    -webkit-font-variant-ligatures: none;
    font-variant-ligatures: none;
    margin-bottom: calc(var(--spacing,.25rem)*0);
    margin-top: calc(var(--spacing,.25rem)*4);
    padding-bottom: calc(var(--spacing,.25rem)*4);
    padding-top: calc(var(--spacing,.25rem)*0);
    transform: translateY(-.5px);
    white-space: pre-wrap;
    white-space: break-spaces;
}
._prosemirror-parent_1dsxi_2.default-browser .placeholder .ProseMirror-trailingBreak {
    display: none!important;
}
 .composer-btn:before {
    --tw-translate-x: -50%;
    --tw-translate-y: -50%;
    content: var(--tw-content);
    inset: calc(var(--spacing)*0);
    left: 50%;
    position: absolute;
    top: 50%;
    transform: var(--tw-rotate-x,)var(--tw-rotate-y,)var(--tw-rotate-z,)var(--tw-skew-x,)var(--tw-skew-y,);
    translate: var(--tw-translate-x)var(--tw-translate-y);
}
.composer-submit-button-color {
    background-color: var(--theme-submit-btn-bg);
    color: var(--theme-submit-btn-text);
}
/* 输入框 */
.pm-parent {
  position: relative;
  flex: 1;
  max-height: max(30svh, 5rem);
  max-height: 52rem;
}

.composer-shell {
  min-height: 56px;
}

.pm-inner {
  min-height: 0;
  padding: 12px 3px 12px;
  border-radius: 16px;
  background: #303030;
  color: inherit;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, padding 0.18s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: auto hidden;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.pm-inner:focus-within {
  border-color: rgba(255, 255, 255, 0.16);
  padding-left: 24px;
}

.pm-inner .ProseMirror,
.pm-inner .ProseMirror > * {
  outline: none !important;
  min-height: 24px;
  line-height: 28px;
  margin: 0;
  padding: 0;
  color: inherit;
  background: transparent;
}

:deep(.placeholder) {
  position: relative;
}

:deep(.placeholder)::before {
  content: attr(data-placeholder);
  position: absolute;
  left: 0;
  top: 0;
  color: rgba(255, 255, 255, 0.4);
  pointer-events: none;
}

:deep(.dark .placeholder)::before {
  color: rgba(255, 255, 255, 0.35);
}

/* 选中文本白边彻底消失 */
.ProseMirror::selection,
.ProseMirror *::selection {
  background: rgba(59, 130, 246, 0.3) !important;
}

/* 暗色模式 */
.dark .pm-inner {
  background: var(--composer-surface-dark, rgba(8, 8, 8, 0.92));
  border-color: rgba(255, 255, 255, 0.12);
}

/* 滚动时的底部渐隐遮罩 */
.scroll-fade-mask {
  pointer-events: none;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 32px;
  background: linear-gradient(transparent, rgba(255,255,255,0.9));
  opacity: 0;
  transition: opacity 0.2s;
}
.is-scrolling ~ .scroll-fade-mask {
  opacity: 1;
}
.dark .scroll-fade-mask {
  background: linear-gradient(transparent, rgba(40,40,40,0.9));
}

.pm-inner::-webkit-scrollbar {
  width: 4px;
}
.pm-inner::-webkit-scrollbar-track {
  background: transparent;
}
.pm-inner::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.32);
  border-radius: 999px;
}
.pm-inner::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
.dark .pm-inner::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.45);
}

.composer-leading,
.composer-trailing {
  align-self: end;
}

.composer-leading {
  align-self: stretch;
  display: flex;
  align-items: center;
}

.leading-action {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  transition: background-color 0.2s ease;
}

.leading-action::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: currentColor;
  opacity: 0;
  transform: scale(0.85);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.leading-action:hover::after,
.leading-action:focus-visible::after {
  opacity: 0.1;
  transform: scale(1);
}
</style>