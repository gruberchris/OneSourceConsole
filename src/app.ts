import dotenv from 'dotenv';
import soap from 'soap';
import { createLogger, format, transports } from 'winston';
import CalculateTaxErrorMessage from './result-messages/CalculateTaxErrorMessage';
import CalculateTaxSuccessMessage from './result-messages/CalculateTaxSuccessMessage';
import ClientCreateErrorMessage from './result-messages/ClientCreateErrorMessage';
import Message from './result-messages/Message';
import RequestMessage from './result-messages/RequestMessage';
import ResponseMessage from './result-messages/ResponseMessage';
import SoapErrorMessage from './result-messages/SoapErrorMessage';

dotenv.config();

const username = process.env.ONE_SOURCE_USERNAME;
const password = process.env.ONE_SOURCE_PASSWORD;
const oneSourceWsdl = process.env.ONE_SOURCE_WSDL;
const oneSourceRequestNamespace = process.env.ONE_SOURCE_REQUEST_NAMESPACE;
const { combine, timestamp, prettyPrint } = format;
const logger = createLogger({
  defaultMeta: { service: 'OneSourceConsole' },
  format: combine(timestamp(), format.json(), prettyPrint()),
  level: 'info',
  transports: [
    new transports.File({ filename: './logs/OneSourceConsole-Error.log', level: 'error' }),
    new transports.File({ filename: './logs/OneSourceConsole.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({ format: format.simple() }));
}

const onMessage = (message: string, eid: string) => {
  const resultMessage = new Message(eid, message);
  logger.info(resultMessage);
};

const onRequest = (xml: string, eid: string) => {
  const resultMessage = new RequestMessage(eid, xml);
  logger.info(resultMessage);
};

const onResponse = (body: string, response: object, eid: string) => {
  const resultMessage = new ResponseMessage(eid, body);
  logger.info(resultMessage);
};

const onSoapError = (error: string, eid: string) => {
  const resultMessage = new SoapErrorMessage(eid, error);
  logger.error(resultMessage);
};

const onCalculateTax = (error: string, result: object) => {
  if (error) {
    const errorMessage = new CalculateTaxErrorMessage(error);
    logger.error(errorMessage);
    return;
  }
  const resultStringified = JSON.stringify(result);
  const resultMessage = new CalculateTaxSuccessMessage(resultStringified);
  logger.info(resultMessage);
};

const onClientCreated = (error: string, client: any) => {
  if (error) {
    const errorMessage = new ClientCreateErrorMessage(error);
    logger.error(errorMessage);
    return;
  }

  client.on('message', onMessage);
  client.on('request', onRequest);
  client.on('response', onResponse);
  client.on('soapError', onSoapError);

  const options = {
    hasTimeStamp: false,
    hasTokenCreated: false,
    mustUnderstand: true
  };

  const wsSecurity = new soap.WSSecurity(username, password, options);

  client.setSecurity(wsSecurity);

  // TODO: Your INDATA object goes here
  const args = {};

  client.CalculateTax(args, onCalculateTax);
};

const url = oneSourceWsdl;

const wsdlOptions = {
  overrideRootElement: {
    namespace: 'ns',
    xmlnsAttributes: [
      {
        name: 'xmlns:ns',
        value: oneSourceRequestNamespace
      }
    ]
  }
};

soap.createClient(url, wsdlOptions, onClientCreated);
