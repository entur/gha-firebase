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

<!-- AUTO-DOC-INPUT:END -->

## Outputs

<!-- AUTO-DOC-OUTPUT:START - Do not remove or modify this section -->

<!-- AUTO-DOC-OUTPUT:END -->
