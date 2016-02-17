<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/



Route::get('/', function () {
    return view('welcome');
});

Route::get('/about', 'PagesController@about');

//Route::post('/user/register/', 'UsersController@create');

Route::get('/csrf', function(){ 
    return csrf_token();
});

Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
Route::post('authenticate', 'AuthenticateController@authenticate');
Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');

Route::get('/entity/{entityName}', function($entityName){
    $entity_client = new Guzzle\Service\Client('http://en.wikipedia.org/w/api.php?pllimit=2&action=query&prop=extracts&format=jsonfm&formatversion=2&redirects=1&exintro=&explaintext=titles=');
    $response = $entity_client->get($entityName)->send();
    echo $response->getBody();
});

Route::get('users/{username}', function($username) {
    $username_client = new Guzzle\Service\Client('https://api.github.com/');
    $response = $username_client->get("users/$username")->send();
    echo $response->getBody();
});

