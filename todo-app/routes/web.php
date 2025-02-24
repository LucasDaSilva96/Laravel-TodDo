<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


class Task {
    public function __construct(
        public int $id,
        public string $title,
        public string $description,
        public ?string $long_description,
        public bool $completed,
        public string $created_at,
        public string $updated_at,
    ){}
}

$tasks = [
    new Task(
        1,
        'Task 1',
        'This is the first task',
        'This is the long description of the first task',
        false,
        '2021-09-01 12:00:00',
        '2021-09-01 12:00:00'
    ),
    new Task(
        2,
        'Task 2',
        'This is the second task',
        'This is the long description of the second task',
        true,
        '2021-09-02 12:00:00',
        '2021-09-02 12:00:00'
    ),
    new Task(
        3,
        'Task 3',
        'This is the third task',
        'This is the long description of the third task',
        false,
        '2021-09-03 12:00:00',
        '2021-09-03 12:00:00'
    ),
    new Task(
        4,
        'Task 4',
        'This is the fourth task',
        'This is the long description of the fourth task',
        true,
        '2021-09-04 12:00:00',
        '2021-09-04 12:00:00'
    ),
    new Task(
        5,
        'Task 5',
        'This is the fifth task',
        'This is the long description of the fifth task',
        false,
        '2021-09-05 12:00:00',
        '2021-09-05 12:00:00'
    ),
    new Task(
        6,
        'Task 6',
        'This is the sixth task',
        'This is the long description of the sixth task',
        true,
        '2021-09-06 12:00:00',
        '2021-09-06 12:00:00'
    )
];



Route::get('/', function () use ($tasks) {
    return Inertia::render('Tasks/Index', [
       'tasks' => $tasks,
    ]);
})->name('tasks.index');


Route::get('/task/{id}', function (int $id) use ($tasks) {
    $task = collect($tasks)->firstWhere('id', $id);
    return Inertia::render('Tasks/Task', [
        'task' => $task,
    ]);
})->name('task.edit');


// Route with a view from React
Route::get('/test', function(){
    return Inertia::render('Test');
})->name('testRoute');

// Route with a parameter
Route::get('/hello/{name}', function(string $name){
    $name = ucfirst($name);
    return Inertia::render('Test', [
        'name'=> $name,
        ]);
});

// Redirect to /test
Route::get('old', function(){
    return redirect()->route('tasks.index');
})->name('oldRoute');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::fallback(function () {
    return Inertia::render('NotFound');
});

require __DIR__.'/auth.php';
