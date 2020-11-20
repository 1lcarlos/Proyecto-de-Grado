//const xhr = new XMLHttpRequest();

/*$.ajax({url:'coneccion.php',
        success: function(response){
            alert(response);
        },
        error: function(xhr,status,error){
            alert("error: "+error);
        }
    });*/




var orderData = [{
    "userId": "1",
    "Caracteristica": "Area Protegida con restriccion", 
    "Categoria": "RESERVA FORESTAL PROTECTORA",     
    "Area": 9990.304806670802
    
},{
    "userId": "2",
     "Caracteristica": "Area Protegida con restriccion",  
     "Categoria": "RESERVA FORESTAL PROTECTORA",     
    "Area": 4851.425276686671
},
{
    "userId": "3",
    "Caracteristica": "Area Protegida con restriccion", 
    "Categoria": "RESERVA FORESTAL PROTECTORA",      
    "Area": 3286.7598389692807
},{
    "userId": "4",
    "Caracteristica": "Area Protegida con restriccion",
    "Categoria": "RESERVA FORESTAL PROTECTORA",       
    "Area": 6514.060183045346
}/*,{
    "userId": "5",
    "Caracteristica": "Area Protegida con restriccion",       
    "Area": 9990.304806670802
},{
    "userId": "1AC43L30HR8",
    "Caracteristica": "Area Protegida con restriccion",       
    "Area": 9990.304806670802
},{
    "userId": "1AC43L30HR8",
    "userName": "Alison Jones",
    "accountType": "BUSINESS",
    "orderTotal": 180.50,
    "orderDate": "2016-02-25"
},{
    "userId": "1AC43L30HR8",
    "userName": "Alison Jones",
    "accountType": "BUSINESS",
    "orderTotal": 180.50,
    "orderDate": "2016-02-25"
},{
    "userId": "1AC43L30HR8",
    "userName": "Alison Jones",
    "accountType": "BUSINESS",
    "orderTotal": 180.50,
    "orderDate": "2016-02-25"
}*/];

// A schema is used to assist the report designer and report engine to know
// about the data types used in the data source.
var orderSchema = {
    fields: [{
        name: "userId",
        type: "text"
    },{
        name: "Caracteristica",
        type: "text"
    },{
        name: "Categoria",
        type: "text"
    },{
        name: "Area",
        type: "number"
    }]
};

var dataSource = {
    id: "orders",   // Internal reference ID
    name: "Orders",  // Data source name shown to report designer
    data: orderData,
    schema: orderSchema
};



var report = jsreports.createReport('Restricciones Ambientales')
    .data('orders') // The report will look for a data source with ID "orders"
    //.page(11, 8.5, 'inches')
    //.page(pager)
    .margins(1, 1,1,0.7)//(superior,derecha,abajo,izquierda)
    //.groupBy('accountType', 'accountType', 'desc')
    .header(0.35)
            .image('img/ASI.png', 0, 0, 1, 0)//(derecha, abajo, escala, separacion entre imagen y el texto inferior)
            .text('ANALISIS DE RESTRICCIONES AMBIENTALES',1.2, 0.4, 5, 0.5,{
                //text_color: 'red', 
                bold: true,
                fontsize: 15
            })//(derecha, abajo, tamaño del contenedor del texto , separacion entre texto y el texto inferior)
        .text('Esta informacion es resultado del cruce de capas de informacion y analisis de las variables provenientes de las entidades generadoras de los datos',0.3,1, 7, 0,{
                //text_color: 'red',
                bold: true,
                fontsize: 10,

            })
        .text('Este documento es de caracter indicativo y busca proveer al usuario de alertas tempranas y por lo tanto no constituye un documento de caracter oficial',0.3,1.4, 7, 0,{
                //text_color: 'red',
                bold: true,
                fontsize: 10,

            })            
        /*.footer(0.5)
            .text('Total: [SUM(orderTotal)]', 2, 0, 2, 0.25, {
                pattern: '$#,##0.00',
                align: 'right',
                bold: true,
            })*/
    .detail()
        /*.text('Esta informacion es resultado del cruce de capas de informacion y analisis de las variables provenientes de las entidades generadoras de los datos',0.3,0, 7, 0,{
                //text_color: 'red',
                bold: true,
                fontsize: 8,

            })
        .text('Este documento es de caracter indicativo y busca proveer al usuario de alertas tempranas y por lo tanto no constituye un documento de caracter oficial',0.3,0.3, 7, 0,{
                //text_color: 'red',
                bold: true,
                fontsize: 8,

            })*/
        .text('Area ha: [Area]',0.3,0.7,3,0)//(derecha, abajo, tamaño del contenedor del texto , separacion entre texto y el texto inferior)
        .text('Caracteristica: [Caracteristica]', 0.3, 0.9, 5,0) 
        .text('Categoria: [Categoria]', 0.3, 1.1, 5, 0)               
    .done();

// Render the report
jsreports.render({
    report_def: report,
    target: $('.reporte').css('min-height', '500px'),
    datasets: [ dataSource ]
});

