import { reactive, onMounted, onUnmounted } from "vue";

export default function getCursorPosition(
  targetName: Window,
  eventName: keyof WindowEventMap,
): { x: number; y: number } {
  //坐标的数据
  const position = reactive({
    x: 0,
    y: 0,
  });

  //获取坐标的方法
  const methods = reactive({
    getCursorPositions(e: MouseEvent) {
      position.x = e.pageX;
      position.y = e.pageY;
    },
  });

  //组件挂载完毕后给window绑定事件，获取鼠标位置
  onMounted(() => {
    targetName.addEventListener(
      eventName,
      methods.getCursorPositions as EventListener,
    );
  });
  onUnmounted(() => {
    targetName.removeEventListener(
      eventName,
      methods.getCursorPositions as EventListener,
    );
  });

  return position;
}
