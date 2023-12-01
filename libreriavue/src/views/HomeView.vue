
<script setup lang="ts">



</script>

<template>
    <section class="hero-section" id="section_1">
        <div class="section-overlay"></div>

        <div class="container d-flex justify-content-center align-items-center">
            <div class="row">

                <div class="col-12 mt-auto mb-5 text-center">
                    <small>Presentacion</small>

                    <h1 class="text-white mb-5">Libreria</h1>
                </div>

                <div class="col-lg-12 col-12 mt-auto d-flex flex-column flex-lg-row text-center">
                    <div class="date-wrap">
                        <h5 class="text-white">
                            <i class="custom-icon bi-clock me-2"></i>
                            21 - 00<sup>th</sup>, Noviembre 2023
                        </h5>
                    </div>

                    <div class="location-wrap mx-auto py-3 py-lg-0">
                        <h5 class="text-white">
                            <i class="custom-icon bi-geo-alt me-2"></i>
                            Sucre, Bolivia
                        </h5>
                    </div>

                    <div class="social-share">
                        <ul class="social-icon d-flex align-items-center justify-content-center">
                            <span class="text-white me-3">Compartir:</span>

                            <li class="social-icon-item">
                                <a href="#" class="social-icon-link">
                                    <span class="bi-facebook"></span>
                                </a>
                            </li>

                            <li class="social-icon-item">
                                <a href="#" class="social-icon-link">
                                    <span class="bi-twitter"></span>
                                </a>
                            </li>

                            <li class="social-icon-item">
                                <a href="#" class="social-icon-link">
                                    <span class="bi-instagram"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="video-wrap">
            <video autoplay="" loop="" muted="" class="custom-video" poster="">
                <source src="@/assets/video/lapices.mp4" type="video/mp4">
            </video>
        </div>
    </section>

    <!--Inicio De Imagenes-->
    <section  id="VE2">
        <div class="find-us">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="section-heading">
                            <h2 style="display: flex; justify-content: center;">VISTA DE CATALOGOS</h2>
                        </div>
                    </div>
                </div>
                <div class="row" style="margin:  60px; justify-content: space-between;">
                    <div class="col-md-4">
                        <p style="font-size: 50px; color: black;">ACRILEX</p>
                        <img src="@/assets/img/Acrilex.jpg" alt="Product Image" class="product-image">
                    </div>
                    <div class="col-md-4">
                        <p style="font-size: 50px; color: black;">BOLIGRAFOS</p>
                        <img src="@/assets/img/Boligrafos.jpg" alt="Product Image" class="product-image">
                    </div>
                    <div class="col-md-4">
                        <p style="font-size: 50px; color: black;">BORRADORES</p>
                        <img src="@/assets/img/Borrador.jpg" alt="Product Image" class="product-image">
                    </div>
                    <div class="col-md-4">
                        <p style="font-size: 50px; color: black;">COLORES</p>
                        <img src="@/assets/img/Colores.jpg" alt="Product Image" class="product-image">
                    </div>
                    <div class="col-md-4">
                        <p style="font-size: 50px; color: black;">EMBALAJES</p>
                        <img src="@/assets/img/Embalaje.jpg" alt="Product Image" class="product-image">
                    </div>
                    <div class="col-md-4">
                        <p style="font-size: 50px; color: black;">ESTUCHES</p>
                        <img src="@/assets/img/Estuche.jpg" alt="Product Image" class="product-image">
                    </div>
                    <div class="col-md-4">
                        <p style="font-size: 50px; color: black;">PAPELERIA</p>
                        <img src="@/assets/img/Papeleria.jpeg" alt="Product Image" class="product-image">
                    </div>
                    <div class="col-md-4">
                        <p style="font-size: 50px; color: black;">REGLAS</p>
                        <img src="@/assets/img/Reglas.jpg" alt="Product Image" class="product-image">
                    </div>
                    <div class="col-md-4">
                        <p style="font-size: 50px; color: black;">RESALTADORES</p>
                        <img src="@/assets/img/Resaltador.jpg" alt="Product Image" class="product-image">
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--Fin De Imagenes-->
</template>



<style scoped>
.find-us {
    background-color: #383838;
    padding: 40px 0;

}


.container {
    max-width: 1200px;
    margin: 0 auto;
}

.section-heading {
    text-align: center;
    margin-bottom: 30px;
}

.product-image {
    width: 100%;
    height: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
}

.product-image:hover {
    transform: scale(1.05);
}

@media (max-width: 767px) {
    .col-md-4 {
        width: 100%;
        margin-bottom: 0px;
    }
}
</style>








