# Publishing Guide for Garden Defence

Your game is ready to publish! Here are several easy ways to share it with the world:

## Option 1: GitHub Pages (Recommended - Free & Easy)

### Steps:
1. **Create a GitHub account** (if you don't have one): https://github.com
2. **Create a new repository**:
   - Go to GitHub and click "New repository"
   - Name it (e.g., "garden-defence-game")
   - Make it **public**
   - Don't initialize with README (you already have files)
   - Click "Create repository"

3. **Upload your files**:
   ```bash
   cd /Users/mertilter/Documents/project1/pvz
   git init
   git add .
   git commit -m "Initial commit - Garden Defence game"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Under "Source", select "main" branch and "/ (root)" folder
   - Click "Save"
   - Your game will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Option 2: Netlify (Free & Very Easy)

### Steps:
1. **Go to Netlify**: https://www.netlify.com
2. **Sign up** (free account)
3. **Drag and drop** your entire `pvz` folder onto Netlify's deploy area
4. **Your game is live!** You'll get a URL like `https://random-name-123.netlify.app`
5. **Optional**: Add a custom domain name in settings

## Option 3: Vercel (Free & Fast)

### Steps:
1. **Go to Vercel**: https://vercel.com
2. **Sign up** with GitHub (or email)
3. **Click "New Project"**
4. **Import your GitHub repository** (or drag & drop your folder)
5. **Deploy!** Your game will be live instantly

## Option 4: Surge.sh (Free & Simple)

### Steps:
1. **Install Surge** (requires Node.js):
   ```bash
   npm install -g surge
   ```

2. **Deploy**:
   ```bash
   cd /Users/mertilter/Documents/project1/pvz
   surge
   ```
   - Follow the prompts
   - Choose a domain name (e.g., `garden-defence.surge.sh`)
   - Your game is live!

## Quick Start Commands (GitHub Pages)

If you want to use GitHub Pages, here are the exact commands:

```bash
# Navigate to your project
cd /Users/mertilter/Documents/project1/pvz

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Publish Garden Defence game"

# Add your GitHub repository (replace with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Then enable GitHub Pages in your repository settings!

## Tips for Publishing

1. **Test locally first**: Open `index.html` in your browser to make sure everything works
2. **Update the title**: Your game title is already set to "Garden Defence" in the HTML
3. **Add a README**: Consider adding a README.md with game instructions
4. **Share the link**: Once published, share your game URL with friends!

## Which Option Should You Choose?

- **GitHub Pages**: Best if you want version control and easy updates
- **Netlify**: Best for drag-and-drop simplicity
- **Vercel**: Best for modern deployment with great performance
- **Surge**: Best for quick command-line deployment

All options are **completely free** for personal projects!

