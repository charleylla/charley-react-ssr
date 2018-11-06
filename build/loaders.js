const { resolve } = require("./bundle");

const cssLoaderModulesClient = {
  test: /\.m\.css$/,
  exclude: /node_modules/,
  use: [
    "style-loader",
    {
      loader:"css-loader",
      options:{
        modules:true
      }
    },
    "postcss-loader"
  ]
}

const cssLoaderModulesServer = {
  test: /\.m\.css$/,
  exclude: /node_modules/,
  use: [
    "isomorphic-style-loader",
    "style-loader",
    {
      loader:"css-loader",
      options:{
        modules:true
      }
    },
    "postcss-loader"
  ]
}

const sassLoaderModulesClient = {
  test: /\.m\.scss$/,
  exclude: /node_modules/,
  use: [
    "style-loader",
    {
      loader:"css-loader",
      options:{
        modules:true
      }
    },
    "sass-loader",
    "postcss-loader",
    {
      loader: "sass-resources-loader",
      options: {
        resources: resolve("src/client/assets/style/main.scss"),
      },
    }
  ]
}

const sassLoaderModulesServer = {
  test: /\.m\.scss$/,
  exclude: /node_modules/,
  use: [
    "isomorphic-style-loader",
    "style-loader",
    {
      loader:"css-loader",
      options:{
        modules:true
      }
    },
    "sass-loader",
    "postcss-loader",
    {
      loader: "sass-resources-loader",
      options: {
        resources: resolve("src/client/assets/style/main.scss"),
      },
    }
  ]
}

const cssLoaderClient = {
  test: /\.css$/,
  exclude: /node_modules|\.m\.css/,
  use: [
    "style-loader",
    "css-loader",
    "postcss-loader"
  ]
}

const cssLoaderServer = {
  test: /\.css$/,
  exclude: /node_modules|\.m\.css/,
  use: [
    "isomorphic-style-loader",
    "style-loader",
   "css-loader",
    "postcss-loader"
  ]
}

const sassLoaderClient = {
  test: /\.m\.scss$/,
  exclude: /node_modules|\.m\.scss/,
  use: [
    "style-loader",
    "css-loader",
    "sass-loader",
    "postcss-loader",
    {
      loader: "sass-resources-loader",
      options: {
        resources: resolve("src/client/assets/style/main.scss"),
      },
    }
  ]
}

const sassLoaderServer = {
  test: /\.m\.scss$/,
  exclude: /node_modules|\.m\.scss/,
  use: [
    "isomorphic-style-loader",
    "style-loader",
    "css-loader",
    "sass-loader",
    "postcss-loader",
    {
      loader: "sass-resources-loader",
      options: {
        resources: resolve("src/client/assets/style/main.scss"),
      },
    }
  ]
}

const jsLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: ["babel-loader"]
}

const imgLoader = {
  test: /\.(png|svg|jpg|gif)$/,
  use: {
    loader: "file-loader",
    options: {
      name: "[name].[ext]",
      outputPath:"img"
    }
  }
}

const fontLoader = {
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  use: {
    loader: "file-loader",
    options: {
      outputPath:"font"
    }
  }
}

const eslintLoader = {
  test: /\.js$/,
  enforce: "pre",
  exclude: /node_modules/,
  loader: "eslint-loader",
  options: {
    fix:true,
    emitWarning:true,
  }
}

exports.loaderGen = (plantform) => {
  const basicLoaders = [
    eslintLoader,
    jsLoader,
    imgLoader,
    fontLoader,
  ]
  if(plantform === "SERVER"){
    basicLoaders.push(
      cssLoaderModulesServer,
      sassLoaderModulesServer,
      cssLoaderServer,
      sassLoaderServer
    );
  }else if(plantform === "CLIENT"){
    basicLoaders.push(
      cssLoaderModulesClient,
      sassLoaderModulesClient,
      cssLoaderClient,
      sassLoaderClient
    );
  }
  return basicLoaders;
}