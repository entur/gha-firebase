# `gha-firebase/firebase-hosting-preview`

## Usage

Add the following step to your workflow configuration:

```yml
jobs:
  firebase-preview-dev:
    uses: entur/gha-firebase/.github/workflows/firebase-hosting-preview.yml@v1
    with:
      gcp_project_id: my-gcp-project-dev
      environment: dev
      build_artifact_name: artifact-name
      build_artifact_path: build
```

## Inputs

<!-- AUTO-DOC-INPUT:START - Do not remove or modify this section -->

|                                           INPUT                                           |  TYPE  | REQUIRED |  DEFAULT  |                 DESCRIPTION                  |
|-------------------------------------------------------------------------------------------|--------|----------|-----------|----------------------------------------------|
| <a name="input_build_artifact_name"></a>[build_artifact_name](#input_build_artifact_name) | string |  false   |           | Name of GitHub artifact to <br>add to build  |
| <a name="input_build_artifact_path"></a>[build_artifact_path](#input_build_artifact_path) | string |  false   | `"build"` |             Path to the artifact             |
|              <a name="input_channel_id"></a>[channel_id](#input_channel_id)               | string |  false   |           |                  Channel ID                  |
|             <a name="input_entry_point"></a>[entry_point](#input_entry_point)             | string |  false   |   `"."`   |         Entry point folder to deploy         |
|             <a name="input_environment"></a>[environment](#input_environment)             | string |   true   |           |  Environment to deploy to (dev, tst, prd)    |
|        <a name="input_gcp_project_id"></a>[gcp_project_id](#input_gcp_project_id)         | string |   true   |           |                GCP Project ID                |
|        <a name="input_preview_expire"></a>[preview_expire](#input_preview_expire)         | string |  false   |  `"7d"`   |             Preview expire time              |
|       <a name="input_timeout_minutes"></a>[timeout_minutes](#input_timeout_minutes)       | number |  false   |   `20`    |              Timeout in minutes              |

<!-- AUTO-DOC-INPUT:END -->

## Outputs

<!-- AUTO-DOC-OUTPUT:START - Do not remove or modify this section -->

|                               OUTPUT                                |                       VALUE                        | DESCRIPTION |
|---------------------------------------------------------------------|----------------------------------------------------|-------------|
| <a name="output_details_url"></a>[details_url](#output_details_url) | `"${{ jobs.deploy_preview.outputs.details_url }}"` |             |
|           <a name="output_urls"></a>[urls](#output_urls)            |    `"${{ jobs.deploy_preview.outputs.urls }}"`     |             |

<!-- AUTO-DOC-OUTPUT:END -->
