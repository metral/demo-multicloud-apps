# demo-multicloud-apps

Deploys Kubernetes apps across AKS and EKS.

## Pre-Requisites

1. [Install Pulumi](https://www.pulumi.com/docs/reference/install).
1. Install [Node.js](https://nodejs.org/en/download).
1. Install a package manager for Node.js, such as [NPM](https://www.npmjs.com/get-npm) or [Yarn](https://yarnpkg.com/lang/en/docs/install).
1. [Install `kubectl`](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl).

AWS

1. [Configure AWS Credentials](https://www.pulumi.com/docs/reference/clouds/aws/setup/).
1. [Install AWS IAM Authenticator for Kubernetes](https://docs.aws.amazon.com/eks/latest/userguide/install-aws-iam-authenticator.html).

Azure

1. [Setup Azure](https://www.pulumi.com/docs/intro/cloud-providers/azure/setup/)

## Deploy the AKS and EKS Clusters

1.  (Required) Deploy the [demo-multicloud-clusters](https://github.com/metral/demo-multicloud-clusters).

## Initialize the Pulumi Project

1.  Clone the repo:

    ```bash
    git clone https://github.com/metral/demo-multicloud-apps
	cd demo-multicloud-apps
    ```

1.  Install the dependencies.

    ```bash
    npm install
    ```

1.  Create a new Pulumi [stack][stack] named `dev`.

    ```bash
    pulumi stack init dev
    ```

1. Set the Pulumi [configuration][pulumi-config] variables for the project.

    > **Note:** Select any valid Kubernetes regions for the providers. Also,
    > reference the AKS & EKS cluster stack in the format:
    > \<organization_or_user\>/\<projectName\>/\<stackName\> e.g. myUsername/multicloud/dev

    ```bash
    pulumi config set azure:location westus2
    pulumi config set aws:region us-west-2
    pulumi config set stackReferenceName myUsername/projectName/stackName
    ```

## Create the Workloads

Create the cluster and deploy the workload by running an update:

```bash
pulumi up
```

## Access Workloads

```bash
pulumi stack output appUrls
```

Visit each of the URL's listed to navigate to their respective NGINX instance.

## Clean Up

Run the following command to tear down the resources that are part of our
stack.

1. Run `pulumi destroy` to tear down all resources.  You'll be prompted to make
   sure you really want to delete these resources.

   ```bash
   pulumi destroy
   ```

1. To delete the stack, run the following command.

   ```bash
   pulumi stack rm
   ```
   > **Note:** This command deletes all deployment history from the Pulumi
   > Console and cannot be undone.

[stack]: https://www.pulumi.com/docs/reference/stack.md"
