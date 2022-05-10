const Joi = require("joi");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const config = {
  client_id: process.env.REACT_APP_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI,
  client_secret: process.env.REACT_APP_CLIENT_SECRET,
  proxy_url: process.env.REACT_APP_PROXY_URL,
  garage_remote_signal_url: process.env.REACT_APP_GARAGE_REMOTE_SIGNAL_URL
};

const envVarsSchema = Joi.object({
  client_id: Joi.string().required(),
  redirect_uri: Joi.string().required(),
  client_secret: Joi.string().required(),
  proxy_url: Joi.string().required(),
  garage_remote_signal_url: Joi.string().required()
});

console.log('config client_id ' + config.client_id)

const { error } = envVarsSchema.validate(config);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = config;
