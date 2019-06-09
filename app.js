let axisX = document.querySelector('.x-axis');
let axisY = document.querySelector('.y-axis');
let cube_container = document.querySelector('.cube-container');
let cube = document.querySelector('.cube-3d');
let small_cubes = document.querySelectorAll('.small-cube-3d');
let cube_texts = document.querySelectorAll('.cube-text');
let home_cube = document.querySelector('.home');
let contact_cube = document.querySelector('.contact');
let about_cube = document.querySelector('.about');
let projects_cube = document.querySelector('.projects');
let axe = document.querySelectorAll('.small-axe');
let lines = document.querySelectorAll('.line');
let main = document.querySelector('main');
let rotation = true;
let x = 1;
let a = 1;



cube.onclick= function()
{
    for(let i=0; i<cube_texts.length; i++)
    {
        cube_texts[i].style.opacity = '0';
        cube_texts[i].style.transition = '1.5s ease-in';
    }

    setTimeout(() => {
        lines[0].style.height = '100%';
        lines[1].style.width = '100%';
    }, 2000);

    
    setTimeout(() => {
        for (let i = 0; i < small_cubes.length; i++) {
            small_cubes[i].style.opacity = '1';
        }
        cube.style.opacity = '0';
        cube.style.transition = '1s ease-in';
        main.style.display = "block";
    }, 3000);


    setTimeout(() => {
        x=0;
        cube_container.style.display = 'none';

        for (let i = 0; i < small_cubes.length; i++) {
            small_cubes[i].classList.add("is-active");
        }

        main.style.opacity = "1";
        
        setInterval(() => {
            for (let i = 0; i < axe.length; i++) {
                a = (a+0.08)%360;
                axe[i].style.transform = `rotateY(${a}deg)`;
            }
        }, 25);


    }, 4500);    

    rotation = false;

}

setInterval(() => {
    if (rotation) {
        x = (x+0.18)%360;
    }
    else{
        x = (x/1.07)%360;
    }

    axisX.style.transform = `rotateX(${x}deg)`;
    axisY.style.transform = `rotateY(${x}deg)`;
    // console.log(x);


}, 25);

