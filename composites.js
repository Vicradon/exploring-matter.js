const $ = n => document.querySelector(n);
const $$ = n => document.querySelectorAll(n);

$$('button').forEach(button => button.addEventListener('click', event => {
  event.preventDefault();
}))

$('#set-x-gravity').onclick = () => {
  if ($('#x-gravity')){
    car1.parent.gravity.x = $('#x-gravity').value;
  }
}
$('#set-y-gravity').onclick = () => {
  if ($('#y-gravity')){
    car1.parent.gravity.y = $('#y-gravity').value;
  }
}



/* BASIC SETUP */
const { Engine, World, Render, Runner, Bodies, Mouse, MouseConstraint, Composites, Body, Composite, Constraint } = Matter;
const engine = Engine.create();
const world = engine.world;
const render = Render.create({
  element: $('#view-canvas'),
  engine: engine,
  options: {
    wireframes: false,
    background: "#222",
    showAngleIndicator:true
  }
});

/* MOUSE SETUP */
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffnes: 1,
    render: { visible: false }
  }
});
let ground = Bodies.rectangle(innerWidth / 2, innerHeight+50, innerWidth+10000, 300, { isStatic: true });
World.add(world, [mouseConstraint, ground]);

/* MAIN CODE */
/**
 * car
 * chain
 * mesh
 * newtons cradle
 * pyramid
 * softbody
 * stack
*/
let group = Body.nextGroup(true);
let car1 = Composites.car(400, 300, 170, 50, 40);
let car2 = Composites.car(700, 300, 170, 50, 40);
var ropeA = Composites.stack(200, 50, 8, 1, 10, 10, function(x, y) {
  return Bodies.rectangle(x, y, 50, 20, { collisionFilter: { group: group } });
});
Composite.add(ropeA, Constraint.create({
  bodyB: ropeA.bodies[0],
  pointB: { x: -25, y: 0 },
  pointA: { x: ropeA.bodies[0].position.x, y: ropeA.bodies[0].position.y },
  stiffness: 0.5
}));

Composites.chain(ropeA, 0.5, 0, -0.5, 0, { stiffness: 0.8, length: 2, render: { type: 'line' } });



World.add(world, [car1, ropeA, car2]);

Render.run(render);
Engine.run(engine);

