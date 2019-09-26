import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";
import * as app from "./app";
import { config } from "./config";

const projectName = pulumi.getProject();

// Create a list of named clusters where the app will be deployed.
interface Cluster {
    provider: k8s.Provider,
    kubeconfig: pulumi.Output<any>,
    staticAppIp?: pulumi.Output<any>,
}

const aksProvider = new k8s.Provider("aksProvider", {kubeconfig: config.aksKubeconfig});
const eksProvider = new k8s.Provider("eksProvider", {kubeconfig: config.eksKubeconfig});

const clusters: {[key: string]: Cluster} = {
    "aks": { kubeconfig: config.aksKubeconfig, provider: aksProvider, staticAppIp: config.aksStaticAppIp},
    "eks": { kubeconfig: config.eksKubeconfig, provider: eksProvider},
};

// To export the list of app URLs of the demo app across all clusters.
interface appUrl {
    name: string,
    url: pulumi.Output<string>,
}

// Create the application on each of the clusters.
export let appUrls: appUrl[] = [];
for (const clusterName of Object.keys(clusters)) {
    const cluster = clusters[clusterName];

    const instance = new app.DemoApp(clusterName, {
        provider: cluster.provider,
        staticAppIp: cluster.staticAppIp,
    });

    let instanceUrl: appUrl = {name: clusterName, url: instance.appUrl};
    appUrls = appUrls.concat(instanceUrl);
}
