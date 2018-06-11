<?php
define( 'DB_NAME', 'wordpress' );
define( 'DB_USER', 'wordpress' );
define( 'DB_PASSWORD', 'wordpress' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );
define( 'AUTH_KEY',         'ok{[!WhGB(Mk,IIR%Hc3%=LsJj]1sssa%CKWL:S!fx95cNR@*+Uz@{Logy4G$vEG' );
define( 'SECURE_AUTH_KEY',  'roy;cEmB7o&l3[o+U[Z ;=i[!yu,z<-PVqy]<5Z8#&6vWW7v>_M(<y]wI*O:bnuGr' );
define( 'LOGGED_IN_KEY',    '8yP1#L,5uN#^r7dma8Cj.>L3#LfI-9x M!9-&&-wmGsl L/r:L68^UT9HKOfsZ..' );
define( 'NONCE_KEY',        'ViPK<M <V76?cEc6KJ!t8B|qmJ`Vd%0&13SL3N+%!X:?3Qm2%$u >2.#qwOdW^!X' );
define( 'AUTH_SALT',        '_X$B0H8XXQ1-c^h6P-H _[rO.^@^7V%hN.2cVoydB(nyx~2!G=Nlm[1qj4w%#A0]' );
define( 'SECURE_AUTH_SALT', 'X{%Yt?MT@1HdE-#xlmpxXh^h5}t;Khw p/L]+{`t$`Q@6S?z:Pwk| Y<r}&%]dLw' );
define( 'LOGGED_IN_SALT',   '@4%.j7<>Moy:*/ion~T.k?>U_yr.m[H4_Q+/N$]?x+,w#cqu^D__iCG%_?tqG5|&' );
define( 'NONCE_SALT',       ',_4};l=^QGf0XRVH6<4a7(V?/xc3uFQ1A=G-Jxz(PPw>)xSVz4^&LD~aKR=wPlB*' );
$table_prefix = 'wp_';
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
if ( ! defined( 'ABSPATH' ) ) {
    define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}
require_once( ABSPATH . 'wp-settings.php' );
