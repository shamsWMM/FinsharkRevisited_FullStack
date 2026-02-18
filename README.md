# FinsharkRevisited_FullStack
Redo [backend (Dotnet) project](https://github.com/shamsWMM/Finshark.git) and implement the front end (React) project. Reference: [Teddy Smith - Finshark](https://github.com/teddysmithdev/FinShark.git).

Refer to the older project's [README.md](https://github.com/shamsWMM/Finshark/blob/0873fc60ebb038c54a1c8598889b5d727aeaa263/README.md) for dotnet project notes.

# React Project
```bash
npm create vite@latest frontend -- --template react-ts
```
## Development With Docker (no local Node required)
```bash
docker compose up --build # first time
docker compose up

docker-compose up -d # optionally open in detached mode
docker-compose logs -f frontend   # follow logs
docker compose exec frontend bash
```

### Editor config (OPTIONAL)
A neovim config is provided in `.docker/nvim/`.
It is mounted read-only into the container.
Feel free to ignore it if you use a different editor.
```bash
nvim --headless "+Lazy sync" +qa # first time: install plugins
nvim # start editing
```
