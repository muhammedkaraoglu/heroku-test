<?php // routes/breadcrumbs.php

// Note: Laravel will automatically resolve `Breadcrumbs::` without
// this import. This is nice for IDE syntax and refactoring.
use Diglactic\Breadcrumbs\Breadcrumbs;

// This import is also not required, and you could replace `BreadcrumbTrail $trail`
//  with `$trail`. This is nice for IDE type checking and completion.
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

// Home
Breadcrumbs::for('app.index', function (BreadcrumbTrail $trail) {
    $trail->push('Gösterge Paneli', route('app.index'));
});
Breadcrumbs::for('app.create', function (BreadcrumbTrail $trail) {
    $trail->parent('app.index');
    $trail->push('Oluşturma', route('app.create'));
});