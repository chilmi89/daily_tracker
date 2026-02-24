<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MakeServiceCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:service {name : The name of the service} {--repository= : The repository class} {--namespace=Superadmin : The namespace folder}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new service interface and implementation';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->argument('name');
        $namespace = $this->option('namespace');
        $repository = $this->option('repository') ?? $name . 'Repository';

        // Ensure directory exists
        $directory = app_path("Services/{$namespace}");
        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        // Create Interface
        $interfaceStub = $this->getInterfaceStub();
        $interfaceStub = str_replace(
            ['{{ namespace }}', '{{ class }}'],
            ["App\\Services\\{$namespace}", $name],
            $interfaceStub
        );

        $interfacePath = "{$directory}/{$name}.php";

        if (!file_exists($interfacePath)) {
            file_put_contents($interfacePath, $interfaceStub);
            $this->info("Service Interface [{$interfacePath}] created successfully.");
        }

        // Create Implementation
        $implementationStub = $this->getImplementationStub();
        $implementationStub = str_replace(
            ['{{ namespace }}', '{{ class }}', '{{ repository }}', '{{ repositoryNamespace }}'],
            ["App\\Services\\{$namespace}", $name, $repository, $this->getRepositoryNamespace($repository, $namespace)],
            $implementationStub
        );

        $implementationPath = "{$directory}/{$name}Impl.php";

        if (!file_exists($implementationPath)) {
            file_put_contents($implementationPath, $implementationStub);
            $this->info("Service Implementation [{$implementationPath}] created successfully.");
        }
    }

    protected function getInterfaceStub(): string
    {
        return <<<'STUB'
<?php

namespace {{ namespace }};

interface {{ class }}
{
    public function getAll();
    public function findById(int $id);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
}
STUB;
    }

    protected function getImplementationStub(): string
    {
        return <<<'STUB'
<?php

namespace {{ namespace }};

use {{ repositoryNamespace }};
use Illuminate\Support\Facades\Hash;

class {{ class }}Impl implements {{ class }}
{
    public function __construct(
        protected {{ repository }} $repository
    ) {}

    public function getAll()
    {
        return $this->repository->getAll();
    }

    public function findById(int $id)
    {
        return $this->repository->findById($id);
    }

    public function create(array $data)
    {
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        return $this->repository->create($data);
    }

    public function update(int $id, array $data)
    {
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        return $this->repository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->repository->delete($id);
    }
}
STUB;
    }

    protected function getRepositoryNamespace(string $repository, string $namespace): string
    {
        if (class_exists("App\\Repositories\\{$namespace}\\{$repository}")) {
            return "App\\Repositories\\{$namespace}\\{$repository}";
        }

        return $repository;
    }
}
