<template>
  <div class="setting-group">
   <!--  （节点排斥力） -->
   <label :for="id">{{ id }}</label>
   <input 
    type="range"
    :id="id"
    :min="min"
    :max="max"
    :step="step"
    :value="intervalValue"
    @input="handleInput"
    @change="handleChange"
    class="number-slider form-range"
  >
   <span class="value-display">{{ intervalValue }}</span>
  </div>
  
</template>

<script setup lang="ts" name="NumberSlider">
import { debounce } from '@/utils/throttle';
import { ref, watch } from 'vue';

  const props = defineProps({
    id: {
      type:String,
      required: true,
    },
    modelValue: {
      type:Number,
      required:true,
    },
    min:{
      type:Number,
      default:1000,
    },
    max:{
      type:Number,
      default:10000,
    },
    step:{
      type:Number,
      default:1,
    },
    debounceTime:{
      type:Number,
      default:300,
    },
  })
  const emit = defineEmits(['update:modelValue','change']);
  const intervalValue = ref(props.modelValue);
  const handleInput = (e:Event)=>{
    if(e.target && e.target instanceof HTMLInputElement){
      const newValue = Number(e.target.value);
      intervalValue.value = newValue;
      emit('update:modelValue',newValue);
      // 重点是控制 Cytoscape runLayout 的频率，子组件无所谓
      // debounceUpdate(newValue);
    }else{
      console.log('不是input元素');
    }
  };
  const debounceUpdate = debounce((value:number)=>{
    emit('update:modelValue',value);
  },props.debounceTime);
  const handleChange = (e:Event)=>{
    if(e.target && e.target instanceof HTMLInputElement){
      emit('change',intervalValue.value);
    }
  }
  watch(
    ()=>props.modelValue,
    (newVal)=>{
      if(newVal !== intervalValue.value){
        intervalValue.value = newVal;
      }
    }
  )
</script>

<style scoped lang="css">
/* 优化滑块滑动 */
.form-range {
  touch-action: manipulation;
  transform: translateZ(0);
  pointer-events: auto;
  user-select: none;
}
</style>