const callbackurl = "#"

const enviocredito = document.getElementById('credit')

enviocredito.addEventListener('submit', (e)=>{
e.preventDefault()
const credito_url= 'http://localhost:3000/trucapay/banco/'+enviocredito['n_tarjeta'].value;//
fetch(credito_url)
.then(respone => respone.json())
.then(data => {
    const fechaex = enviocredito['MMCredit'].value.toString()+"/"+enviocredito['AACredit'].value.toString()
    if((enviocredito['n_tarjeta'].value == data[0].numerotarjeta) && (fechaex == data[0].fechaex) && (enviocredito['CVVCredit'].value==data[0].cvv)){
        console.log(data[0].monto)
        if(parseInt(document.getElementById('precio').innerHTML) <= parseInt(data[0].monto)){
            let html=''
            html+=`
            <div class="alert alert-success" role="alert">
                <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button>
                <strong>Pago exitoso! </strong> Su pago se ha realizado de forma satisfactoria
                </div>
                <ul>
                    <li>nombre JSON:${data[0].nombre}</li>
                    <li>apellido JSON:${data[0].apellido}</li>
                    <li>numero de tarjeta JSON:${data[0].numerotarjeta}</li>
                    <li>cvv JSON:${data[0].cvv}</li>
                </ul>
                
            `;
                
            var url = 'http://localhost:3000/trucapay/tienda';
            var data = {estado: 'exitoso',
                        monto: document.getElementById('precio').innerHTML.toString()};

            fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));

            document.getElementById('realizado').innerHTML = html;
            setTimeout(() => {sleep().then(window.location.href = callbackurl )},5000);
            const sleep = async function(){
                html=""
                document.getElementById('realizado').innerHTML = html;  
            }
        }
        else{
            alert('Monto insuficiente')
        }
    }
    else{
        alert("Datos incorrectos, intente nuevamente")
    }   
})
.catch(error => console.log('ERROR submit credit'))

})

const enviodebito = document.getElementById('form_debito')
enviodebito.addEventListener('submit', (e) =>{
    e.preventDefault();
    //document.getElementById('asd').value
    const debito_url= 'http://localhost:3000/trucapay/banco/'+enviodebito['asd'].value+"_"+enviodebito['n_tarjeta'].value;//
    fetch(debito_url)
    .then(respone => respone.json())
    .then(data => {
        const fechaex = enviodebito['MMDebit'].value.toString()+"/"+enviodebito['AADebit'].value.toString()
        if((enviodebito['n_tarjeta'].value == data[0].numerotarjeta) && (fechaex == data[0].fechaex) && (enviodebito['CVVDebit'].value==data[0].cvv)){
            if(parseInt(document.getElementById('precio').innerHTML) <= parseInt(data[0].monto)){
                let html=''
                html+=`
                <div class="alert alert-success" role="alert">
                    <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button>
                    <strong>Pago exitoso! </strong> Su pago se ha realizado de forma satisfactoria
                    </div>
                    <ul>
                        <li>banco JSON:${data[0].banco}</li>
                        <li>numero de tarjeta JSON:${data[0].numerotarjeta}</li>
                        <li>monto JSON:${data[0].monto}</li>
                    </ul>
                    `;

                var url = 'http://localhost:3000/trucapay/tienda';
                var data = {estado: 'exitoso',
                            monto: document.getElementById('precio').innerHTML.toString()};
    
                fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers:{
                    'Content-Type': 'application/json'
                }
                }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => console.log('Success:', response));
                document.getElementById('realizado').innerHTML = html;
                setTimeout(() => {sleep().then(window.location.href = callbackurl )},5000);
                const sleep = async function(){
                    html=""
                    document.getElementById('realizado').innerHTML = html;  
                }                   
            }
            else{
                alert('Monto insuficiente')
            }
        }
        else{
            alert("Datos incorrectos, intente nuevamente")
        }   
    })
    .catch(error => console.log('ERROR submit dedit'))
})




const enviomach = document.getElementById('form_mach')
enviomach.addEventListener('submit', (e) =>{
    e.preventDefault();
    const mach_url= 'http://localhost:3000/trucapay/banco/'+enviomach['rut_mach'].value+","+enviomach['n_tarjeta'].value;//
    fetch(mach_url)
    .then(respone => respone.json())
    .then(data => {
        if(parseInt(document.getElementById('precio').innerHTML) <= parseInt(data[0].monto)){
            let html=''
            html+=`
            <div class="alert alert-success" role="alert">
                <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button>
                <strong>Pago exitoso! </strong> Su pago se ha realizado de forma satisfactoria
                </div>
                <ul>
                    <li>numero de tarjeta JSON:${data[0].numerotarjeta}</li>
                    <li>monto JSON:${data[0].monto}</li>
                    <li>cvv JSON:${data[0].cvv}</li>
                </ul>
                `;

            var url = 'http://localhost:3000/trucapay/tienda';
            var data = {estado: 'exitoso',
                        monto: document.getElementById('precio').innerHTML.toString()};

            fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
            document.getElementById('realizado').innerHTML = html;
            setTimeout(() => {sleep().then(window.location.href = callbackurl )},5000);
            const sleep = async function(){
                html=""
                document.getElementById('realizado').innerHTML = html;  
            }

        }
        else{
            alert('Monto insuficiente')
        } 
    })
    .catch(error => alert("Datos invalidos"))
})



















































































































