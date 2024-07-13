<script lang="ts">
import { GLTF, useGltfAnimations } from "@threlte/extras";

const { gltf } = useGltfAnimations<"BeingCute">(({ actions }) => {
  // console.log({ actions });
  actions["BeingCute"]?.play();
});
</script>

<GLTF bind:gltf={$gltf}
      url="/models/maya-birmain-cat-v1-draco-report.glb"
      useDraco={true}
      castShadow
      receiveShadow
      position={{y: -2}}
      scale={0.1} />

