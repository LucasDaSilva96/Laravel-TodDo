<?php

use App\Http\Controllers\ProfileController;
use App\Models\Task;
use Illuminate\Foundation\Application;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;





Route::get('/', function ()  {
    $tasks =  Task::select('*')->orderBy('created_at','desc')->get();
    return Inertia::render('Tasks/Index', [
       'tasks' => $tasks,
    ]);
})->name('tasks.index');

Route::get('/tasks/create', function () {
    return Inertia::render('Tasks/Create');
})->name('tasks.create');


Route::post('/tasks', function () {
    request()->validate([
        'title' => 'required',
        'description' => 'required',
    ]);

    Task::create([
        'title' => request('title'),
        'description'=> request('description'),
        'completed' => request('completed'),
        'long_description' => request('long_description') ?? null,
    ]);

    return redirect()->route('tasks.index');
})->name('tasks.store');

Route::patch('/tasks/{id}', function (int $id){

    $task = Task::findOrFail($id);
    $task->completed = request('completed');
    $task->save();

}
)->name('tasks.update');


Route::delete('/tasks/{id}', function (int $id){
    $task = Task::findOrFail($id);
    $task->delete();
    return redirect()->route('tasks.index');
})->name('tasks.destroy');

Route::get('/completed', function (){
    $tasks = Task::latest()->where('completed', true)->get();

    if( !$tasks->count() > 0) {
       abort(Response::HTTP_NOT_FOUND);
    }

    return Inertia::render('Tasks/Completed', [
        'tasks' => $tasks,
    ]);
});


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

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

Route::get('/task/{id}', function (int $id) {
    $task = Task::findOrFail( $id );

    // if(!$task){
    //     abort(Response::HTTP_NOT_FOUND);
    // }
    return Inertia::render('Tasks/Task', [
        'task' => $task,
    ]);
})->name('task.edit');


Route::fallback(function () {
    return Inertia::render('NotFound');
});

require __DIR__.'/auth.php';

