let PROTO_PATH = __dirname + '/proto/service.proto';
let grpc = require('grpc');
let protoLoader = require('@grpc/proto-loader');
let packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);
let protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
let client = new protoDescriptor.RouteGuide('localhost:50051',
    grpc.credentials.createInsecure());

client.getCadet({ value: "Grady Phillips" }, (err, cadet) => {
    if (err) return console.log(err)

    return console.log(cadet)
})