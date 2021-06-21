<?php

namespace App\Http\Controllers\App;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Diglactic\Breadcrumbs\Breadcrumbs;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$pageBreadcrumb = collect(['text' => "Gösterge Paneli",'disabled' => false,'href' =>  "login"]);
        Inertia::share(['pageBreadcrumb' => Breadcrumbs::generate('app.dashboard')]);
        return Inertia::render('App/Dashboard/Index');
    }

}
