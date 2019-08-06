<template>
    <GmapMap
        :center="{lat:coordinates.lat, lng:coordinates.lng}"
        :zoom="16"
        map-type-id="terrain"
        style="width: 100%; height: 400px"
    >
        <GmapMarker
            :position="coordinates"
            animation= "google.maps.Animation.DROP"
        />
    </GmapMap>
</template>

<script>
export default {
    data(){
        return{
            coordinates:{lat: 37.7699298, lng: -122.4469157}
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            // this.$getLocation()
            // .then(coordinates => {
            //     console.log('coordinates ::: ', coordinates);
            //     this.coordinates = coordinates
            // });

            this.$gmapApiPromiseLazy().then(() => { 
                var directionsService = new google.maps.DirectionsService();
                var directionsDisplay = new google.maps.DirectionsRenderer();
                var haight = new google.maps.LatLng(37.7699298, -122.4469157);
                var oceanBeach = new google.maps.LatLng(37.7683909618184, -122.51089453697205);
                var mapOptions = {
                    zoom: 14,
                    center: haight
                }
                var map = new google.maps.Map(document.getElementById('map'), mapOptions);
                directionsDisplay.setMap(map);
            })
        }
    }

}
</script>

<style>

</style>
