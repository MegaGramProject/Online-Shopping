<?php

return [

    'paths' => ['/api/*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:8024', 'http://localhost:8033'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];