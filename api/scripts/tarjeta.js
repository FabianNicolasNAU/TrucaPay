const enviocredito = document.getElementById('credit')

enviocredito.addEventListener('submit', (e)=>{
    e.preventDefault()
    const credito_url= 'http://localhost:3000/users/banco/'+enviocredito['n_tarjeta'].value;//
    fetch(credito_url)
    .then(respone => respone.json())
    .then(data => {
        const fechaex = enviocredito['MMCredit'].value.toString()+"/"+enviocredito['AACredit'].value.toString()
        if((enviocredito['n_tarjeta'].value == data[0].numerotarjeta) && (fechaex == data[0].fechaex) && (enviocredito['CVVCredit'].value==data[0].cvv)){
            if(document.getElementById('precio').innerHTML <= data[0].monto){
               
                let html=''
                html+=`
                <div class="alert alert-success" role="alert">
                    <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button>
                    <strong>Pago exitoso! </strong> Su pago se ha realizado de forma satisfactoria
                    </div>
                    `;
                document.getElementById('realizado').innerHTML = html;
                setTimeout(() => {
                    sleep()
                },
                5000
                );
                const sleep = function(){
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


