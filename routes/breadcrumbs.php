<?php // routes/breadcrumbs.php

// Note: Laravel will automatically resolve `Breadcrumbs::` without
// this import. This is nice for IDE syntax and refactoring.
use Diglactic\Breadcrumbs\Breadcrumbs;

// This import is also not required, and you could replace `BreadcrumbTrail $trail`
//  with `$trail`. This is nice for IDE type checking and completion.
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

// Home
Breadcrumbs::for('app.dashboard', function (BreadcrumbTrail $trail) {
    $trail->push('Gösterge Paneli', route('app.dashboard'));
});
Breadcrumbs::for('app.note.create', function (BreadcrumbTrail $trail) {
    $trail->parent('app.dashboard');
    $trail->push('Not Oluştur', route('app.note.create'));
});