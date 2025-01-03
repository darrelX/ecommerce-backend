const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // Fonction qui interroge l'utilisateur pour les paramètres
  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'moduleName',
        message: 'Enter the name of your module:',
        default: 'example',
      },
    ]);
  }

  // Génération des fichiers
  writing() {
    const moduleName = this.answers.moduleName;
    const capitalizedName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

    // Copier les fichiers depuis des templates
    this.fs.copyTpl(
      this.templatePath('controller.ts.ejs'),
      this.destinationPath(`${moduleName}/${moduleName}.controller.ts`),
      { moduleName, capitalizedName }
    );

    this.fs.copyTpl(
      this.templatePath('service.ts.ejs'),
      this.destinationPath(`${moduleName}/${moduleName}.service.ts`),
      { moduleName, capitalizedName }
    );

    this.fs.copyTpl(
      this.templatePath('module.ts.ejs'),
      this.destinationPath(`${moduleName}/${moduleName}.module.ts`),
      { moduleName, capitalizedName }
    );
  }
};
