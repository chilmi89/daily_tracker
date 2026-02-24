<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MakeRepositoryCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:repository {name : The name of the repository} {--model= : The model class} {--namespace=Superadmin : The namespace folder}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new repository class';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->argument('name');
        $namespace = $this->option('namespace');
        $model = $this->option('model') ?? $name;

        // Ensure directory exists
        $directory = app_path("Repositories/{$namespace}");
        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        $stub = $this->getStub();
        $stub = str_replace(
            ['{{ namespace }}', '{{ class }}', '{{ model }}', '{{ modelNamespace }}'],
            ["App\\Repositories\\{$namespace}", $name, $model, $this->getModelNamespace($model)],
            $stub
        );

        $filePath = "{$directory}/{$name}.php";

        if (file_exists($filePath)) {
            $this->error("Repository {$name} already exists!");
            return;
        }

        file_put_contents($filePath, $stub);

        $this->info("Repository [{$filePath}] created successfully.");
    }

    protected function getStub(): string
    {
        return <<<'STUB'
<?php

namespace {{ namespace }};

use {{ modelNamespace }};

class {{ class }}
{
    public function __construct(
        protected {{ model }} $model
    ) {}

    public function getAll()
    {
        return $this->model->latest()->get();
    }

    public function findById(int $id)
    {
        return $this->model->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data)
    {
        $model = $this->findById($id);
        $model->update($data);
        return $model->fresh();
    }

    public function delete(int $id)
    {
        $model = $this->findById($id);
        return $model->delete();
    }

    public function paginate(int $perPage = 15)
    {
        return $this->model->latest()->paginate($perPage);
    }
}
STUB;
    }

    protected function getModelNamespace(string $model): string
    {
        if (class_exists("App\\Models\\{$model}")) {
            return "App\\Models\\{$model}";
        }

        return $model;
    }
}
