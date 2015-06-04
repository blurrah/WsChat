from fabric.api import cd, env, local, lcd, run, sudo, settings
from fabric.contrib.files import exists
from fabric.operations import put

env.roledefs = {
    'production': ['root@178.62.202.159']
}

def deploy():
    """Deploying to remote"""

    # Distribute release package
    local('tar zcvf release.tar.gz index.js package.json')

    with settings(warn_only=True):
        run('forever stop wschat')

    with cd('/var/node/wschat'):
        run('mkdir -p build')
        put('release.tar.gz', 'build/release.tar.gz')
        run('rm -rf app')
        run('mkdir -p app')
        run('tar -xvzf build/release.tar.gz -C app')
        run('rm build/release.tar.gz')
        with cd('app'):
            run('npm install --ignore-scripts')

        run('forever -a -o app/out.log --uid wschat start app/index.js')
