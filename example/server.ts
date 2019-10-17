let PROTO_PATH = __dirname + '/proto/service.proto';
let grpc = require('grpc');
let protoLoader = require('@grpc/proto-loader');
let server = new grpc.Server();
// Suggested options for similarity to existing grpc.load behavior
let cadets = [
    {
        name: "Sears Bignose",
        classYear: 2020
    },
    {
        name: "Grady Phillips",
        classYear: 2022
    }
];
function getCadet(call, callback) {
    let matching = cadets.filter(cadet => cadet.name == call.request.value)
    if (matching.length > 0)
        callback(null, matching[0])
    else
        callback(new Error("no cadet found"), null)

    server.forceShutdown()
}

let packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
let protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// The protoDescriptor object has the full package hierarchy
let routeguide = protoDescriptor.RouteGuide;
server.addService(routeguide.service, {
    getCadet
})

server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();
console.log('Bound on 50051')