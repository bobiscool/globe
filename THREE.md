## 记录我开发THREE 的一些坑

1. lookAt 只对mesh对象管用
2. 只有mesh出来的文件才有 位置以此类推
3. 调整自身角度 。。 在geometry的时候调节
4. TWEENJS 用法
   ``` javascript
   new TWEEN.Tween(_self.laser.position).to({
                     x:2100,
                     y:0,
                     z:0
                   },2000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function () {
                     console.log("动画4");
                   });
   ```

5. TWEENJS  图 [link](http://sole.github.io/tween.js/examples/03_graphs.html)

6. 一个模型的xyz怎么来确。。。就没有一个helper吗？以及旋转的helper

7. object 的pivot 怎么来改变 [link](https://github.com/mrdoob/three.js/issues/1364)
[link2](http://jafty.com/blog/tag/change-pivot-point-of-three-js-object/) [link3](http://stackoverflow.com/questions/12746011/three-js-how-do-i-rotate-a-cylinder-around-a-specific-point)

8. 如何平滑的过渡 THREE.LOOKAT [link](http://stackoverflow.com/questions/30292831/three-js-lookat-how-to-pan-smoothly-between-old-and-new-target-positions) [example](http://jsfiddle.net/pm26kd0t/4/)

9. threejs 的动画尽量不要切换镜头 切换镜头那个 。 实现出来都会有卡顿

10. THREEJS X轴红色 Y轴绿色 Z轴 蓝

11. 发光材质 [link](http://stemkoski.github.io/Three.js/Shader-Glow.html)

12. 如何让TWEEN沿着一个路径变化
