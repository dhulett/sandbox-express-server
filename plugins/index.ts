import { Express, Router } from 'express';
import fs from 'fs';

export default class PluginLoader {
    private pluginDirs: string[] = [];
    private loadedPlugins: string[] = [];
    private router: Router = Router();

    constructor(private pluginsRoute: string, private server: Express) {
        this.router.get('/', (req, res) => { res.json(this.getLoadedPlugins()); });
    }

    public addPluginDir(pluginDir: string) {
        if (!this.pluginDirs.includes(pluginDir)) {
            this.pluginDirs.push(pluginDir);
        }
    }

    public async loadAllPlugins() {
        for (const pluginsDir of this.pluginDirs) {
            await this.loadPluginsFromDir(pluginsDir);
        }
        this.server.use(this.pluginsRoute, this.router);
    }

    private async loadPluginsFromDir(pluginsDir: string) {
        const pluginsFiles = await this.getPluginsFiles(pluginsDir);
        pluginsFiles.forEach(this.loadPlugin.bind(this));
    }

    private async getPluginsFiles(pluginsDir: string) : Promise<string[]> {
        return new Promise((resolve, reject) => {
            fs.readdir(pluginsDir, (err, files) => {
                if (!err && files.length) {
                    resolve(files.filter(file => file !== 'index.ts' && file.match('.ts')));
                }
                else {
                    reject(err);
                }
            });
        });
    }

    private loadPlugin(pluginFile: string) {
        try {
            const { route, router } = require(`./${pluginFile}`);
            this.router.use(route, router);
            this.loadedPlugins.push(route);
            console.log(`Loaded ${pluginFile} to ${this.pluginsRoute}${route}`);
        }
        catch (error) {
            console.log(`Failed loading ${pluginFile}`);
            console.log(error);
        }
    }

    private getLoadedPlugins() {
        return this.loadedPlugins;
    }
}
