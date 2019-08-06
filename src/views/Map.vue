<template>
    <GmapMap id="map" ref="map"
        :center="{lat:coordinates.lat, lng:coordinates.lng}"
        :zoom="16"
        map-type-id="terrain"
        style="width: 100%; height: 500px"
    >
        <GmapMarker
            :position="coordinates"
        />
    </GmapMap>
</template>

<script>
export default {
    data(){
        return{
            coordinates:{lat: 37.7699298, lng: -122.4469157},
            animation:{}
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            this.$getLocation()
            .then(coordinates => {
                console.log('coordinates ::: ', coordinates);
                this.coordinates = coordinates
            });
            var _self = this;
            
            this.$gmapApiPromiseLazy().then(() => { 
                console.log('MAP ::: ', new google.maps.LatLng(14.5831, 120.9794))
                this.animation = google.maps.Animation.DROP
                var directionsService = new google.maps.DirectionsService();
                var directionsDisplay = new google.maps.DirectionsRenderer();
                directionsDisplay.setMap(this.$refs.map.$mapObject)
                directionsService.route({
                    origin: new google.maps.LatLng(14.5831, 120.9794),
                    destination: new google.maps.LatLng(_self.coordinates.lat, _self.coordinates.lng),
                    travelMode: 'DRIVING'
                }, function (response, status) {
                    console.log('response ::: ', response)
                    if (status === 'OK') {
                    directionsDisplay.setMap(null)
                    directionsDisplay.setMap(_self.$refs.map.$mapObject)
                    directionsDisplay.setDirections(response)
                    } else {
                    console.log('Directions request failed due to ' + status)
                    }
                })
            })
        }
    }

}
</script>

<style>

</style>
