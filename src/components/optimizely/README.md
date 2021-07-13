> OptimizelyExperiment, OptimizelyProvider, OptimizelyVariation, and useExperiment were meant to mimic components found in [Optimizely's FullStack SDK](https://docs.developers.optimizely.com/full-stack/docs/optimizelyexperiment) since our license only includes [Web SDK](https://docs.developers.optimizely.com/web/docs).

If at some point FullStack is used, the one line snippet should be removed in favor of SDK initialization. The following will also need to be changed:

_Before_

```javascript
import {
  OptimizelyExperiment, // Subset of FullStack props
  OptimizelyProvider, // "optimizely" prop not required.
  OptimizelyVariation, // Subset of FullStack props with a "variation" prop added
  useExperiment, // Same parameters
} from './components/optimizely'
```

_After_

```javascript
import {
  createInstance, // Required by OptimizelyProvider.
  OptimizelyExperiment,
  OptimizelyProvider, // Wire up using "optimizely" prop.
  OptimizelyVariation,
  useExperiment,
} from '@optimizely/react-sdk'
```
