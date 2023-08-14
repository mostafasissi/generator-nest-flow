const fs = require('fs');

module.exports = function (moduleName, modulePath , appModulePath) {
        if (fs.existsSync(appModulePath)) {
            // Read the content of the AppModule
            let appModuleContent = fs.readFileSync(appModulePath, 'utf8');
            //console.log(appModuleContent);

            // Check if the module has already been imported


            // Import the newly generated module
            const newModuleImport = `import { ${moduleName} } from '${modulePath}';`;
            appModuleContent = newModuleImport + "\n" + appModuleContent;
            // Include the new module in the imports array
            appModuleContent = appModuleContent.replace(
                /(imports\s*:\s*\[)/,
                `$1${moduleName},`
            );
            // Write the updated content back to the AppModule
            fs.writeFileSync(appModulePath, appModuleContent);

        }
}
