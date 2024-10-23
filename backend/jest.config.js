module.exports = {
    testEnvironment: "node",
    transform: {
        "^.+\\.(js)$": "babel-jest", // transpiles your code first using babel before running tests
        "^.+\\.(ts|tsx)$": "ts-jest" //se transforman usando ts-jest, que permite trabajar con TypeScript.
    },
    //setupFiles: ["./setupTests.js"], //Especifica archivos que se deben ejecutar antes de cada prueba
    testMatch: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ], // this is default, you can change based on your needs
    testPathIgnorePatterns: ["/node_modules/","/build/"], //Lista de patrones de rutas que Jest debe ignorar al buscar archivos de prueba
    testTimeout: 5000, // Establece un tiempo máximo (en milisegundos) que Jest esperará para que una prueba se complete antes de considerarla fallida
    collectCoverage: true, //Si se establece en true, Jest recopilará información de cobertura de código al ejecutar las pruebas.
    coverageThreshold: { //Define umbrales mínimos de cobertura de código. En este caso, se requiere que al menos el 80% de las ramas, funciones, líneas y declaraciones sean cubiertas por las pruebas
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }, // optional
    collectCoverageFrom: [ //Especifica qué archivos o directorios se deben incluir para la recopilación de cobertura.
        "./index.js"
        // you can add any folder where your code is
    ], // optional
    coveragePathIgnorePatterns: [//Define patrones de rutas que Jest debe ignorar al calcular la cobertura de código
        "/node_modules/",
        // add any file/folder for which you don't want coverage to be calculated
    ] // optional
}