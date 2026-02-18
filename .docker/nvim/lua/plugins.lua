return {

  -- LSP
  {
    "neovim/nvim-lspconfig",
    config = function()

      -- new API as of nvim-lspconfig v2+ / neovim 0.11
      vim.lsp.config("ts_ls", {
        root_markers = { "tsconfig.json", "package.json" },
        on_attach = function(client, bufnr)
          local opts = { buffer = bufnr }
          vim.keymap.set("n", "gd", vim.lsp.buf.definition, opts)
          vim.keymap.set("n", "K",  vim.lsp.buf.hover, opts)
          vim.keymap.set("n", "gr", vim.lsp.buf.references, opts)
          vim.keymap.set("n", "<leader>rn", vim.lsp.buf.rename, opts)
          vim.keymap.set("n", "<leader>ca", vim.lsp.buf.code_action, opts)
          vim.keymap.set("n", "<leader>e", vim.diagnostic.open_float, opts)
          vim.keymap.set("n", "[d", vim.diagnostic.goto_prev, opts)
          vim.keymap.set("n", "]d", vim.diagnostic.goto_next, opts)
        end,
      })
      vim.lsp.enable("ts_ls")

      vim.lsp.config("eslint", {
        root_markers = { "eslint.config.js", "package.json" },
        on_attach = function(client, bufnr)
          vim.api.nvim_create_autocmd("BufWritePre", {
            buffer = bufnr,
            command = "EslintFixAll",
          })
        end,
      })
      vim.lsp.enable("eslint")

    end,
  },

  -- Autocompletion
  {
    "hrsh7th/nvim-cmp",
    dependencies = {
      "hrsh7th/cmp-nvim-lsp",
      "hrsh7th/cmp-buffer",
      "hrsh7th/cmp-path",
    },
    config = function()
      local cmp = require("cmp")
      cmp.setup({
        mapping = cmp.mapping.preset.insert({
          ["<Tab>"]     = cmp.mapping.select_next_item(),
          ["<S-Tab>"]   = cmp.mapping.select_prev_item(),
          ["<CR>"]      = cmp.mapping.confirm({ select = true }),
          ["<C-Space>"] = cmp.mapping.complete(),
        }),
        sources = cmp.config.sources({
          { name = "nvim_lsp" },
          { name = "buffer" },
          { name = "path" },
        }),
      })
    end,
  },

  -- Treesitter
  {
    "nvim-treesitter/nvim-treesitter",
    build = ":TSUpdate",
    lazy = false,
    priority = 1000,
    config = function()
      -- new API: require("nvim-treesitter").setup()
      -- not require("nvim-treesitter.configs").setup()
      require("nvim-treesitter").setup({
        ensure_installed = {
          "typescript", "tsx", "javascript",
          "json", "css", "html", "lua"
        },
        sync_install = false,
        auto_install = true,
      })

      -- highlight and indent are now enabled separately
      vim.api.nvim_create_autocmd("FileType", {
        callback = function(ev)
          pcall(vim.treesitter.start)
        end,
      })
    end,
  },

  -- Fuzzy finder
  {
    "nvim-telescope/telescope.nvim",
    dependencies = { "nvim-lua/plenary.nvim" },
    config = function()
      local builtin = require("telescope.builtin")
      vim.keymap.set("n", "<leader>ff", builtin.find_files)
      vim.keymap.set("n", "<leader>fg", builtin.live_grep)
      vim.keymap.set("n", "<leader>fb", builtin.buffers)
    end,
  },

  -- File tree
  {
    "nvim-tree/nvim-tree.lua",
    config = function()
      require("nvim-tree").setup({
        respect_buf_cwd = false,
        update_focused_file = {
          enable = true,
          update_root = false,
        },
      })
      vim.keymap.set("n", "<leader>t", ":NvimTreeToggle<CR>")
    end,
  },

}
