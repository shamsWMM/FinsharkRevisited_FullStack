# FinsharkRevisited_FullStack
Redo [backend (Dotnet) project](https://github.com/shamsWMM/Finshark.git) and implement the front end (React) project. Reference: [Teddy Smith - Finshark](https://github.com/teddysmithdev/FinShark.git).

Refer to the older project's [README.md](https://github.com/shamsWMM/Finshark/blob/0873fc60ebb038c54a1c8598889b5d727aeaa263/README.md) for dotnet project notes.

## Project Structure
├── docker-compose.yml
├── frontend/ # React + Vite + TypeScript
│   └── Dockerfile.dev
└── api/ # ASP.NET Web API (.NET 8)
    └── Dockerfile.dev

# React Project
```bash
npm create vite@latest frontend -- --template react-ts
npm run build
npm run dev
```

## Development With Docker (no local Node or .NET required)

### Start Everything
```bash
docker compose up --build
docker compose up
docker compose up frontend      # frontend + api + database
docker compose up api           # api + database
docker compose up azuresqledge  # database only
docker compose up --no-deps frontend  # frontend only, skip dependencies
```

### Useful Commands
```bash
docker compose up -d                    # run in detached mode
docker compose logs -f frontend         # follow frontend logs
docker compose logs -f api              # follow api logs
docker compose exec frontend bash       # shell into frontend
docker compose exec api bash            # shell into api
docker compose down                     # stop everything
docker compose down -v                  # stop everything + delete database volume
```


### Editor config (OPTIONAL)
A neovim config is provided in `.docker/nvim/`.
It is mounted read-only into the container.
Feel free to ignore it if you use a different editor.
```bash
nvim --headless "+Lazy sync" +qa # first time: install plugins
nvim # start editing
```
