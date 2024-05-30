AFRAME.registerComponent("model1",{
    init: async function(){

        var models = await this.getModels()
        var barcodes = Object.keys(models)

        barcodes.map(barcode =>{
            var armodel = models[barcode];
            this.createModels(armodel)
        })
    },

    getModels: async function(){
        return fetch("js/modelList.json")
        .then(res=> res.json())
        .then(data=> data);
    },

    createModels: async function(armodel){
        var barcodeValue = armodel.barcode_value;
        var modelUrl = armodel.model_url;
        var modelName = armodel.model_name;

        var scene = document.querySelector("a-scene");
        var marker = document.createElement("a-marker");

        marker.setAttribute("id",`marker-${modelName}`);
        marker.setAttribute("type", "barcode");
        marker.setAttribute("model_name", modelName);
        marker.setAttribute("value", barcodeValue);
        marker.setAttribute("markerhandler",{});
        scene.appendChild(marker)

        if(barcodeValue === 0){
            var modelEl = document.createElement("a-entity");
            modelEl.setAttribute("id", `${modelName}`);
            modelEl.setAttribute("geometry",{
                primitive: "box",
                width: armodel.width,
                height: armodel.height
            })

            modelEl.setAttribute("position", armodel.position);
            modelEl.setAttribute("rotation", armodel.rotation);
            modelEl.setAttribute("material",{
                color: armodel.color
            })

            marker.appendChild(modelEl);

        }else{
            var modelEl = document.createElement("a-entity");
            modelEl.setAttribute("id", `${modelName}`);
            modelEl.setAttribute("gltf-model", `url(${modelUrl})`);
            modelEl.setAttribute("scale", armodel.scale);
            modelEl.setAttribute("position", armodel.position);
            modelEl.setAttribute("rotation", armodel.rotation);
            marker.appendChild(modelEl);
        }
    }


})