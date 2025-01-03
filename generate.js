const fs = require('fs');
const path = require('path');

// Fonction pour créer un fichier avec un contenu de base
function createFile(filePath, content) {
  fs.writeFileSync(filePath, content, { flag: 'wx' }, (err) => {
    if (err) {
      console.error(`Error creating file ${filePath}: ${err.message}`);
    }
  });
}

// Fonction pour générer les fichiers nécessaires
function generateModule(moduleName) {
  const folderPath = path.join(__dirname, moduleName);

  // Créer le dossier
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  // Contenus par défaut
  const controllerContent = `
import { Controller, Get, Query, Param, Post, Delete, Put, Body } from '@nestjs/common';
import { ${capitalize(moduleName)}Service } from './${moduleName}.service';
import { ${capitalize(moduleName)} } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Controller('${moduleName}')
export class ${capitalize(moduleName)}Controller {
  constructor(private readonly ${moduleName}Service: ${capitalize(moduleName)}Service) {}

  @Get()
  async get${capitalize(moduleName)}(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
    @Query('where') where?: string,
    @Query('orderBy') orderBy?: string,
    @Query('page') page: string = '1'
  ): Promise<{ total: number, page: number, data: ${capitalize(moduleName)}[] }> {
    const params = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      cursor: cursor ? JSON.parse(cursor) : undefined,
      where: where ? JSON.parse(where) : undefined,
      orderBy: orderBy ? JSON.parse(orderBy) : undefined,
    };

    
    const ${moduleName}s = await this.${moduleName}Service.${moduleName}s(params);
    const total = await this.${moduleName}Service.count${capitalize(moduleName)}s(params.where);
    return {
      total : total,
       page: Number(page),
       data : ${moduleName}s,
    };
  }
  
  @Get(':id')
  async get${capitalize(moduleName)}s(@Param('id') id: string): Promise<${capitalize(moduleName)} | null> {
    return this.${moduleName}Service.${moduleName}({ id: Number(id) });
  }

  @Put(':id')
  async update${capitalize(moduleName)}(
    @Param('id') id: string,
    @Body() data: Prisma.${capitalize(moduleName)}UpdateInput,
  ): Promise<${capitalize(moduleName)}> {
    return this.${moduleName}Service.update${capitalize(moduleName)}({
      where: { id: Number(id) },
      data,
    });
  }

  @Post('')
  async create${capitalize(moduleName)}(@Body() ${moduleName}Data: Prisma.${capitalize(moduleName)}CreateInput): Promise<${capitalize(moduleName)}> {
    return this.${moduleName}Service.create${capitalize(moduleName)}(${moduleName}Data);
  }

  @Delete(':id')
  async delete${capitalize(moduleName)}(@Param('id') id: string): Promise<${capitalize(moduleName)}> {
    return this.${moduleName}Service.delete${capitalize(moduleName)}({ id: Number(id) });
  }
}
`;

  const serviceContent = `
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ${capitalize(moduleName)}, Prisma } from '@prisma/client';

@Injectable()
export class ${capitalize(moduleName)}Service {
  constructor(private prisma: PrismaService) {}

  async ${moduleName}(
    ${moduleName}WhereUniqueInput: Prisma.${capitalize(moduleName)}WhereUniqueInput,
  ): Promise<${capitalize(moduleName)} | null> {
    return this.prisma.${moduleName}.findUnique({
      where: ${moduleName}WhereUniqueInput,
    });
  }

  async ${moduleName}s(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.${capitalize(moduleName)}WhereUniqueInput;
    where?: Prisma.${capitalize(moduleName)}WhereInput;
    orderBy?: Prisma.${capitalize(moduleName)}OrderByWithRelationInput;
  }): Promise<${capitalize(moduleName)}[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.${moduleName}.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create${capitalize(moduleName)}(data: Prisma.${capitalize(moduleName)}CreateInput): Promise<${capitalize(moduleName)}> {
    return this.prisma.${moduleName}.create({
      data,
    });
  }

  async update${capitalize(moduleName)}(params: {
    where: Prisma.${capitalize(moduleName)}WhereUniqueInput;
    data: Prisma.${capitalize(moduleName)}UpdateInput;
  }): Promise<${capitalize(moduleName)}> {
    const { where, data } = params;
    return this.prisma.${moduleName}.update({
      data,
      where,
    });
  }

  async count${capitalize(moduleName)}s(where?: Prisma.${capitalize(moduleName)}WhereInput): Promise<number> {
    return this.prisma.${moduleName}.count({
      where,
    });
  }

  async delete${capitalize(moduleName)}(where: Prisma.${capitalize(moduleName)}WhereUniqueInput): Promise<${capitalize(moduleName)}> {
    return this.prisma.${moduleName}.delete({
      where,
    });
  }
}

`;

  const moduleContent = `
import { Module } from '@nestjs/common';
import { ${capitalize(moduleName)}Service } from './${moduleName}.service';
import { ${capitalize(moduleName)}Controller } from './${moduleName}.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  imports: [],
  controllers: [${capitalize(moduleName)}Controller],
  providers: [${capitalize(moduleName)}Service, PrismaService],
})
export class ${capitalize(moduleName)}Module {}
`;

  // Créer les fichiers
  createFile(path.join(folderPath, `${moduleName}.controller.ts`), controllerContent);
  createFile(path.join(folderPath, `${moduleName}.service.ts`), serviceContent);
  createFile(path.join(folderPath, `${moduleName}.module.ts`), moduleContent);

  console.log(`Module "${moduleName}" generated successfully!`);
}

// Fonction pour capitaliser la première lettre
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Récupérer le nom du module à partir des arguments CLI
const moduleName = process.argv[2];
if (!moduleName) {
  console.error('Please provide a module name.');
  process.exit(1);
}

generateModule(moduleName);
