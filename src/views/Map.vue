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
            coordinates:{lat: 14, lng: 121}
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
        }
    }

}
</script>

<style>

</style>
