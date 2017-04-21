## 记录我开发THREE 的一些坑

1. lookAt 只对mesh对象管用
2. 只有mesh出来的文件才有 位置以此类推
3. 调整自身角度 。。 在geometry的时候调节
4. TWEENJS 用法 `new TWEEN.Tween(_self.laser.position).to({
                     x:2100,
                     y:0,
                     z:0
                   },2000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function () {
                     console.log("动画4");
                   });`
5. TWEENJS  图 [link](http://sole.github.io/tween.js/examples/03_graphs.html)

6. 一个模型的xyz怎么来确。。。就没有一个helper吗？

7. object 的pivot 怎么来改变 [link](https://github.com/mrdoob/three.js/issues/1364)
[link2](http://jafty.com/blog/tag/change-pivot-point-of-three-js-object/) [link3](http://stackoverflow.com/questions/12746011/three-js-how-do-i-rotate-a-cylinder-around-a-specific-point)

8. 如何平滑的过渡 THREE.LOOKAT [link](http://stackoverflow.com/questions/30292831/three-js-lookat-how-to-pan-smoothly-between-old-and-new-target-positions) [example](http://jsfiddle.net/pm26kd0t/4/)

