import * as THREE from 'three';
import { PointCloudOctree, Potree } from '@pnext/three-loader';

//import { OrbitControls } from './orbitControls';

import { fitCameraToPCO } from './fitCameraToPCO';

const serverConfig = {
  cloudjs: 'cloud.js',
  makeURL(path) {
    return `http://localhost:4000/${path}`;
    // return `https://cdn.rawgit.com/potree/potree/develop/pointclouds/lion_takanawa/${path}`;
  },
};

main();

function main() {
  const el = document.getElementById('target');

  const renderer = new THREE.WebGLRenderer();
  const camera = new THREE.PerspectiveCamera(50, NaN, 0.001, 100000);
  //const orbitControls = new OrbitControls(camera, el);
  //orbitControls.mouseButtons = {
  //  ORBIT: THREE.MOUSE.RIGHT,
  //  ZOOM: THREE.MOUSE.MIDDLE,
  //  PAN: THREE.MOUSE.LEFT,
  //};
  //orbitControls.panningMode = OrbitControls.HorizontalPanning;
  const scene = new THREE.Scene();

  updateSize(renderer, camera, el);
  // Add resize listener
  window.addEventListener('resize', () => {
    updateSize(renderer, camera, el);
  });

  el.appendChild(renderer.domElement);

  const potree = new Potree();

  load(serverConfig, potree, (pco) => {
    // Set position to a point far from (0, 0, 0)
    camera.position.set(50, 50, 50);
    // Set valid direction of 'sky'
    camera.up = new THREE.Vector3(0, 0, 1);
    //fitCameraToPCO(scene, camera, pco, 1.1, orbitControls);

    scene.add(pco);

    render(renderer, scene, camera, potree, pco);
  });
}

function load(config, potree, afterLoad) {
  potree.loadPointCloud(config.cloudjs, config.makeURL)
    .then((pco) => {
      pco.position.set(0, 0, 0);
      pco.updateMatrixWorld(true);
      afterLoad(pco);

      return pco;
    })
    .catch((err) => {
      console.error(err);
    });
}

function render(renderer, scene, camera, potree, pco) {
  requestAnimationFrame(_render);

  function _render() {
    requestAnimationFrame(_render);

    potree.updatePointClouds([pco], camera, renderer);

    renderer.clear();
    renderer.render(scene, camera);
  }
}

function updateSize(renderer, camera, el) {
  const { width, height } = el.getBoundingClientRect();
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

