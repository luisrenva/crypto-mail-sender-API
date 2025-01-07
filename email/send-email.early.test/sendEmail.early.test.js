
// Unit tests for: sendEmail




const nodemailer = require('nodemailer')
const util = require('../../utils/util')
const nodemailer = require('nodemailer');
const util = require('../../utils/util');
const { sendEmail } = require('../path-to-your-module');
const { sendEmail } = require('../send-email');

jest.mock("nodemailer");
jest.mock("../../utils/util");

describe('sendEmail() sendEmail method', () => {
  let createTransportMock;
  let sendMailMock;

  beforeEach(() => {
    sendMailMock = jest.fn((mailOptions, callback) => {
      callback(null, { response: '250 OK' });
    });

    createTransportMock = jest.fn(() => ({
      sendMail: sendMailMock,
    }));

    nodemailer.createTransport.mockImplementation(createTransportMock);
    util.createLogStatement.mockReturnValue('Log statement');
  });

  describe('Happy Path', () => {
    it('should send an email successfully with correct parameters', () => {
      // Arrange
      const body = 'Test email body';
      process.env.HOTMAIL_USER = 'testuser@hotmail.com';
      process.env.HOTMAIL_PWD = 'testpassword';
      process.env.ENVIRONMENT = 'PROD';
      process.env.EMAILS = 'recipient@example.com';

      // Act
      sendEmail(body);

      // Assert
      expect(createTransportMock).toHaveBeenCalledWith({
        host: 'smtp-mail.outlook.com',
        secureConnection: false,
        port: 587,
        tls: { ciphers: 'SSLv3' },
        auth: {
          user: 'testuser@hotmail.com',
          pass: 'testpassword',
        },
      });

      expect(sendMailMock).toHaveBeenCalledWith(
        {
          from: 'testuser@hotmail.com',
          to: 'recipient@example.com',
          subject: 'Change in Crypto(s) !!!!!!',
          html: 'Below the crypto(s) that meet the criterias: <br><br>Test email body',
        },
        expect.any(Function)
      );
    });
  });

  describe('Edge Cases', () => {
    it('should send an email to a default address when not in production', () => {
      // Arrange
      const body = 'Test email body';
      process.env.HOTMAIL_USER = 'testuser@hotmail.com';
      process.env.HOTMAIL_PWD = 'testpassword';
      process.env.ENVIRONMENT = 'DEV';

      // Act
      sendEmail(body);

      // Assert
      expect(sendMailMock).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'lerv.1984@gmail.com',
        }),
        expect.any(Function)
      );
    });

    it('should handle errors in sendMail gracefully', () => {
      // Arrange
      const body = 'Test email body';
      sendMailMock.mockImplementationOnce((mailOptions, callback) => {
        callback(new Error('SMTP Error'), null);
      });

      // Act
      sendEmail(body);

      // Assert
      expect(sendMailMock).toHaveBeenCalled();
    });
  });
});

// End of unit tests for: sendEmail
