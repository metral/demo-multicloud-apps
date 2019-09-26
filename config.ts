import * as pulumi from "@pulumi/pulumi";

let pulumiConfig = new pulumi.Config();

// Reference the deployed multicloud Pulumi stack.
// A stack reference is required in the format:
// <organization_or_user>/<projectName>/<stackName> e.g. myUsername/projectName/stackName
const stackReferenceName = pulumiConfig.require("stackReferenceName");
const multicloud = new pulumi.StackReference(stackReferenceName);

export const config = {
    aksStaticAppIp: multicloud.getOutput("aksStaticAppIp"),
    aksKubeconfig: multicloud.getOutput("aksKubeconfig"),
    eksKubeconfig: multicloud.getOutput("eksKubeconfig"),
};
