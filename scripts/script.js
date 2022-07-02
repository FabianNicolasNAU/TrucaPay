const num = document.getElementById("n_tarjeta")
const tarjeta = document.getElementById("tarj_ico")

num.addEventListener('keyup' , (e) =>{
    console.log(num.value.length)

    if(num.value.length >=6){
        const codigo = num.value
        const visa = /^4[0-9]{3}-?[0-9]{2}$/
        const mastercard = /^5[1-5][0-9]{2}-?[0-9]{2}$/
        if(codigo.match(visa) && codigo[0]==4){
            document.getElementById("n_tarjeta").style.borderColor = 'lightgrey';
            let html = ''
            html +=`
                <i class="fa-brands fa-cc-visa"></i>
            `;
            tarjeta.innerHTML = html;
            html = '';
        }
        if(codigo.match(mastercard) && codigo[0]==5){
            document.getElementById("n_tarjeta").style.borderColor = 'lightgrey';
            let html = ''
            html +=`
                <i class="fa-brands fa-cc-mastercard"></i>
            `;
            tarjeta.innerHTML = html;
            html = '';
        }
        if(codigo[0] !=5 && codigo[0] !=4){
            console.log("tamalalawea")
            document.getElementById("n_tarjeta").style.borderColor = 'red';
            let html = ''
            html +=`
            Tarjeta invalida
                <i class="fa-brands fa-cc-visa"></i>
                <i class="fa-brands fa-cc-mastercard"></i>
            `;
            tarjeta.innerHTML = html;
            html = '';
        }
    }
    else{
            let html = ''
            html +=`
                <i class="fa-brands fa-cc-visa"></i>
                <i class="fa-brands fa-cc-mastercard"></i>
            `;
            tarjeta.innerHTML = html;
            html = '';
    }
})

