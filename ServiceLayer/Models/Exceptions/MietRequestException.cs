﻿using System.Net;

namespace ServiceLayer.Models.Exceptions
{
    public class MietRequestException: Exception
    {
        private readonly string _url;
        private readonly int _statusCode;
        private readonly string _body;

        public MietRequestException(string message, string url, int statusCode, string body): base(message) 
        {
            _url = url;
            _statusCode = statusCode;
            _body = body;
        }

        public MietRequestException(string message, string url, HttpStatusCode statusCode, string body) 
            : this(message, url, (int)statusCode, body) { }

        public override string ToString()
        {
            return $"ulr: {_url}{Environment.NewLine}" +
                $"status code: {_statusCode}{Environment.NewLine}" +
                $"content: {_body}{Environment.NewLine}" +
                $"exception: {base.ToString()}";
        }
    }

}
