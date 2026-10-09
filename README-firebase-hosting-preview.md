# `gha-firebase/firebase-hosting-preview`

## Usage

Add the following step to your workflow configuration:

```yml
jobs:
  firebase-preview-dev:
    permissions:
      contents: read
      pull-requests: write
      id-token: write  # required for Workload Identity Federation
    uses: entur/gha-firebase/.github/workflows/firebase-hosting-preview.yml@v1
    with:
      gcp_project_id: my-gcp-project-dev
      environment: dev
      build_artifact_name: artifact-name
      build_artifact_path: build
```

## New Firebase projects

From October 15, 2026, new Firebase projects no longer get a default Hosting site on creation. The site is provisioned on demand, and a first deploy to a project without a site fails with `404 Site Not Found`.

By default (`create_site: true`) the workflow checks whether the Hosting site exists and creates it only if it is missing, so existing projects are unaffected and new projects work without extra setup. The site ID defaults to `gcp_project_id`; set `site_id` if that subdomain is taken. Creating a site requires the service account to have `firebasehosting.sites.create` (e.g. Firebase Hosting Admin); it is only needed when the site is actually missing.

When `target` is set the deploy goes to a site mapped in `.firebaserc`, which is not necessarily named after the project. In that case the step is skipped unless you also set `site_id`. Set `create_site: false` to turn the step off entirely.

## Inputs

<!-- AUTO-DOC-INPUT:START - Do not remove or modify this section -->

|                                           INPUT                                           |  TYPE  | REQUIRED |   DEFAULT   |                        DESCRIPTION                         |
|-------------------------------------------------------------------------------------------|--------|----------|-------------|------------------------------------------------------------|
| <a name="input_build_artifact_name"></a>[build_artifact_name](#input_build_artifact_name) | string |  false   |             |        Name of GitHub artifact to <br>add to build         |
| <a name="input_build_artifact_path"></a>[build_artifact_path](#input_build_artifact_path) | string |  false   |  `"build"`  |                    Path to the artifact                    |
|             <a name="input_entry_point"></a>[entry_point](#input_entry_point)             | string |  false   |    `"."`    |                Entry point folder to deploy                |
|             <a name="input_environment"></a>[environment](#input_environment)             | string |   true   |             |         Environment to deploy to (dev, tst, prd)           |
|        <a name="input_gcp_project_id"></a>[gcp_project_id](#input_gcp_project_id)         | string |   true   |             |                       GCP Project ID                       |
|        <a name="input_preview_expire"></a>[preview_expire](#input_preview_expire)         | string |  false   |   `"7d"`    |                    Preview expire time                     |
|                    <a name="input_target"></a>[target](#input_target)                     | string |  false   |             |    Optional Firebase Hosting target name <br>to deploy     |
| <a name="input_site_id"></a>[site_id](#input_site_id) | string | false | | Hosting site ID to create when create_site is true (defaults to gcp_project_id). Required for creation when target is set |
| <a name="input_create_site"></a>[create_site](#input_create_site) | boolean | false | `true` | Create the Firebase Hosting site if it does not exist. <br>Skipped when target is set unless site_id is also set |
|       <a name="input_timeout_minutes"></a>[timeout_minutes](#input_timeout_minutes)       | number |  false   |    `20`     |                     Timeout in minutes                     |
|          <a name="input_tools_version"></a>[tools_version](#input_tools_version)          | string |  false   | `"15.18.0"` | Optional Firebase-tools version to use <br>when deploying  |

<!-- AUTO-DOC-INPUT:END -->

## Outputs

<!-- AUTO-DOC-OUTPUT:START - Do not remove or modify this section -->

|                               OUTPUT                                |                       VALUE                        | DESCRIPTION |
|---------------------------------------------------------------------|----------------------------------------------------|-------------|
| <a name="output_details_url"></a>[details_url](#output_details_url) | `"${{ jobs.deploy_preview.outputs.details_url }}"` |             |
|           <a name="output_urls"></a>[urls](#output_urls)            |    `"${{ jobs.deploy_preview.outputs.urls }}"`     |             |

<!-- AUTO-DOC-OUTPUT:END -->
