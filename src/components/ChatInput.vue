<template>
  <div  id="thread-bottom-container" class="group/thread-bottom-container relative isolate z-10 w-full basis-auto md:border-transparent md:pt-0 dark:border-white/20 md:dark:border-transparent content-fade single-line flex flex-col">
    <div id="thread-bottom">
      <div class="text-base mx-auto [--thread-content-margin:--spacing(4)] thread-sm:[--thread-content-margin:--spacing(6)] thread-lg:[--thread-content-margin:--spacing(16)] px-(--thread-content-margin)">
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
            <form action="" class="group/composer w-full "> 
              <!-- 「三栏自适应 + 一键重排」——
只要 JS 给祖先加一句 data-expanded=""，Grid 区域瞬间换布局，不用改 DOM 顺序，一条类名搞定。 -->
              <div class="bg-token-bg-primary cursor-text overflow-clip bg-clip-padding p-2.5 contain-inline-size dark:bg-[#303030] grid grid-cols-[auto_1fr_auto] [grid-template-areas:'header_header_header'_'leading_primary_trailing'_'._footer_.'] group-data-expanded/composer:[grid-template-areas:'header_header_header'_'primary_primary_primary'_'leading_footer_trailing'] shadow-short" style="border-radius: 28px; transform: none; transform-origin: 50% 50% 0px;">
                <!-- 没 data-expanded → 负 margin 继续存在，视觉上顶底穿透，更紧凑
有 data-expanded → 负 margin 被 mb-0 覆盖 → 贴底无空隙，更宽松 -->
                <div class="-my-2.5 flex min-h-14 items-center overflow-x-hidden px-1.5 [grid-area:primary] group-data-expanded/composer:mb-0 group-data-expanded/composer:px-2.5" style="transform: none; transform-origin: 50% 50% 0px;">
                  <div class="_prosemirror-parent_1dsxi_2 text-token-text-primary max-h[max(30svh,5rem)] max-h-52 flex-1 overflow-auto default-browser vertical-scroll-fade-mask">
                    <textarea class="_fallbackTextarea_1dsxi_2"  name="prompt-textarea" autofocus placeholder="输入一个关键词" data-virtualkeyboard="true" style="display: none;">

                    </textarea>
                    <div contenteditable="true" translate="no" class="ProseMirror" ref="editorEL" data-virtualkeyboard="true">
                      <!-- proseMirror生成占位符 -->
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="ChatInput">

import { onMounted,ref,onBeforeUnmount } from 'vue';
// prosemirror
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema } from 'prosemirror-schema-basic';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { placeholder } from 'prosemirror-placeholder';
import { history, undo, redo } from 'prosemirror-history'
import 'prosemirror-view/style/prosemirror.css'; 


const editorEL = ref(null);
let view = null;
onMounted(()=>{
  // 快捷键
  const customKeymap = {
    'Mod-z':undo,
    'Mod-shift-z':redo,
  };
  const state = EditorState.create({
    schema,
    plugins: [
      history(),
      placeholder('询问任何问题'),
      keymap(baseKeymap),
      keymap(customKeymap)
    ]
  });
  view = new EditorView(document.querySelector('#prompt-textarea'), {
    state,
  });
})
onBeforeUnmount(() => {
  view?.destroy()
})
</script>

<style scoped lang="css">
.single-line {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: clip;   /* 不用 ... 用渐变 */
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
/* ._prosemirror-parent_1dsxi_2.default-browser .placeholder .ProseMirror-trailingBreak {
    display: none!important;
} */
</style>