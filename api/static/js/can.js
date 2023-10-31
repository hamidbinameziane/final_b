window.addEventListener('load' , ()=> {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    var clr = document.getElementById('myc')
    var pclr = document.getElementById("pclr")
    var sze = document.getElementById('myr')
    var num = document.getElementById('myn')
    var clear = document.getElementById('allC')
    var und = document.getElementById('undo')
    var image = document.getElementById('file')

    var his_array = new Array()
    var step = -1;
    var can_p = new Image();
    var h = 0;

    




    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth * 1.5;
    ctx.lineWidth = sze.value;
    let paint = false

    function drawimg() {

        var img = new Image()
        var f = image.files[0]
        var url = window.URL || window.webkitURL
        var src = url.createObjectURL(f);
      
        img.src = src;
        img.onload = function(){
          ctx.drawImage(img,0,0);
        }
      }
  
    function startP ()
    {

        paint = true
        Draw(e)
    }
    function endP ()
    {

        paint = false
        ctx.beginPath()

    }
    function Draw(e)
    {
        if(!paint)return;
            ctx.lineTo(e.offsetX, e.offsetY)
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.stroke()
        if (h == 50)
        {
            his_P()
            h = 0
            if (his_array.length == 1)
            {
            und.style.color = 'black'
            und.style.fontWeight = 900
            }
        }
        h++
    }
    function szeC()
    {
        if (sze.value > 100)
        {
            sze.value = 100
        }
        else if (sze.value < 1)
        {
            sze.value = 1
        }

        ctx.lineWidth = sze.value
        num.value = sze.value
    }
    function numC()
    {
        if (num.value > 100)
        {
            num.value = 100
        }
        else if (num.value < 1)
        {
            num.value = 1
        }
        ctx.lineWidth = num.value
        sze.value = num.value
    }
    function clrC()
    {
        ctx.strokeStyle = clr.value
        pclr.style.color = clr.value
    }
    function clearA()
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    function his_P()
    {
        step++
        if (step < his_array.length)
        {
            his_array.length = step - 1
        }        
        his_array.push(canvas.toDataURL())
    }
    function undo()
    {

        if (step == 0)
        {
            und.style.color = 'aliceblue'
            und.style.fontWeight = 900
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            return
        }
        else
        {
            step--
            can_p.src = his_array[step]
            can_p.onload = function ()
            {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(can_p, 0, 0)
            }
        }
    }

    canvas.addEventListener('mousedown', startP)
    canvas.addEventListener('mouseup', endP)
    canvas.addEventListener('mousemove', Draw)
    canvas.addEventListener('pointerdown', startP)
    canvas.addEventListener('pointerup', endP)
    canvas.addEventListener('pointerout', endP)
    canvas.addEventListener('pointerout', endP)
    canvas.addEventListener('pointermove', Draw)
    clr.addEventListener('input', clrC)
    sze.addEventListener('input', szeC)
    num.addEventListener('input', numC)
    clear.addEventListener('mousedown', clearA)
    und.addEventListener('mousedown', undo)
    und.addEventListener('mouseover', () => {
        und.style.fontWeight = 500;
      });
      und.addEventListener('mouseout', () => {
        und.style.fontWeight = 900;
      });

    image.addEventListener('change', drawimg)


})

