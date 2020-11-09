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
let landing_text = document.querySelector('.landing-text');
let about_text = document.querySelector('.about-text');
let projects_text = document.querySelector('.projects-text');
let contact_text = document.querySelector('.contact-text');
let rotation = true;
let x = 1;
let a = 1;
let isclicked = false;

let small_cube_array = [home_cube,contact_cube,about_cube,projects_cube]
let texts_array = [landing_text,contact_text,about_text,projects_text]

for (let i = 0; i < small_cube_array.length; i++) {
    let this_cube = small_cube_array[i];
    let this_text = texts_array[i];

    this_cube.addEventListener('mouseenter', e => {
        for (let j = 0; j < texts_array.length; j++) {
            if (small_cube_array[j] !== this_cube) {
                setTimeout(() => {
                    texts_array[j].classList.remove('visible');
                }, 250);
                texts_array[j].style.opacity = 0;
            }
        }
        setTimeout(() => {
            this_text.style.opacity = 1;
        }, 500);
        setTimeout(() => {
            this_text.classList.add('visible');
        }, 250);
    })
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

cube.onclick= function()
{
    isclicked = true;
    let ran_array = [0,0,0,0];
    ran_array = ran_array.map(x => getRandomArbitrary(1,1.3));
    ran_num = Math.ceil(getRandomArbitrary(1,4));

    cube_texts.forEach(element => 
    {
        element.innerText = "BIENVENUE"
    });
    
    setTimeout(() => 
    {
        for(let i=0; i<cube_texts.length; i++)
        {
            cube_texts[i].style.opacity = '0';
            cube_texts[i].style.transition = '1.5s ease-in';
        }
    }, 1000);

    setTimeout(() => 
    {
        lines[0].style.height = '100%';
        lines[1].style.width = '100%';
    }, 3000);

    
    setTimeout(() => 
    {
        for (let i = 0; i < small_cubes.length; i++) 
        {
            small_cubes[i].style.opacity = '1';
        }
        cube.style.opacity = '0';
        cube.style.transition = '1s ease-in';
        main.style.display = "block";
    }, 4000);


    setTimeout(() => 
    {
        x=0;
        cube_container.style.display = 'none';

        for (let i = 0; i < small_cubes.length; i++) 
        {
            small_cubes[i].classList.add("is-active");
        }

        main.style.opacity = "1";
        
        setInterval(() => 
        {
            for (let i = 0; i < axe.length; i++) 
            {
                a = (a+0.08)%360;
                b = i%ran_num === 0 ? -1 : 1;
                axe[i].style.transform = `rotateY(${a*ran_array[i]*b}deg)`;
            }
        }, 25);


    }, 5500);    

    rotation = false;
}

// BIG CUBE ANIMATION HOVER
let hover_num = 3;
cube.addEventListener('mouseenter', e => 
{
    hover_num = 6;
    setInterval(() => 
    {
        hover_num += 0.1;
    }, 100);
    setInterval(() => 
    {
        hover_num += 0.1;
    }, 100);
    setTimeout(() => 
    {
        if (!isclicked) 
        {
            cube_texts.forEach(element => 
            {
                element.innerText = "ERROR<$r>ERROR&&ERROR"
            });
        }
    }, 1000);
    setTimeout(() => 
    {
        if (!isclicked) 
        {
            cube_texts.forEach(element => 
            {
                element.innerText = "I'M SORRY DAVE"
            });
        }
    }, 3000);
    setTimeout(() => 
    {
        if (!isclicked) 
        {
            cube_texts.forEach(element => 
            {
                element.innerText = "I'MSORRYDAVE<$r>ERROR^&$"
            });
        }
    }, 5500);
});
cube.addEventListener('mouseleave', e => 
{
    hover_num = 3;
    setInterval(() => 
    {
        hover_num -= 0.1;
    }, 100);
    setInterval(() => 
    {
        hover_num -= 0.2;
    }, 100);
});

// BIG CUBE ANIMATION
setInterval(() => 
{
    if (rotation) 
    {
        x = (x+0.18)%360;
    }
    else
    {
        x = (x/1.07)%360;
    }

    axisX.style.transform = `rotateX(${x*hover_num}deg)`;
    axisY.style.transform = `rotateY(${x*hover_num}deg)`;
}, 25);

